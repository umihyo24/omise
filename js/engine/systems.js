
function pickEvent(events, rng) {
  const roll = Math.floor(rng.next() * 100) + 1;
  return events.find(e => roll >= e.roll_low && roll <= e.roll_high) || events[0];
}

function pickLoot(table, rng) {
  const total = table.reduce((s, e) => s + e.weight, 0);
  let r = rng.next() * total;
  for (const entry of table) {
    if ((r -= entry.weight) < 0) {
      const qty = entry.qty_min + rng.nextInt(entry.qty_max - entry.qty_min + 1);
      return { id: entry.item_id, qty };
    }
  }
  const first = table[0];
  return { id: first.item_id, qty: first.qty_min };
}

export function gather(state, data) {
  const locId = data.locations[0].id;
  const events = data.gatherEvents[locId];
  const ev = pickEvent(events, state.rng);
  const loot = pickLoot(data.lootTables[ev.loot_table_id], state.rng);
  state.inventory[loot.id] = (state.inventory[loot.id] || 0) + loot.qty;
  state.logs.push(`${ev.action} → ${data.items[loot.id].name} x${loot.qty}`);
  state.flags.gathered = true;
}

export function craft(state, data) {
  const recipe = data.recipes[0];
  const need = recipe.input[0];
  if ((state.inventory[need.id] || 0) >= need.qty) {
    state.inventory[need.id] -= need.qty;
    const out = recipe.output[0];
    state.inventory[out.id] = (state.inventory[out.id] || 0) + out.qty;
    state.logs.push(`${recipe.name} → ${data.items[out.id].name} x${out.qty}`);
    state.flags.crafted = true;
  } else {
    state.logs.push('材料が不足しています');
  }
}

export function sell(state, data) {
  const id = 'stone-charm';
  if (state.inventory[id]) {
    state.inventory[id] -= 1;
    state.money += data.items[id].base_price;
    state.logs.push(`販売 → +${data.items[id].base_price}G`);
    state.flags.sold = true;
    if (state.flags.gathered && state.flags.crafted && state.flags.sold) {
      state.logs.push('1日が終了しました');
      state.day += 1;
      state.flags = { gathered: false, crafted: false, sold: false };
    }
  } else {
    state.logs.push('商品がありません');
  }
}
