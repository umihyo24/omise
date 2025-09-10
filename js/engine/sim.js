import { RNG } from '../rng.js';
import { data } from './data.js';
import { gather, craft, sell } from './systems.js';

function createSimState(seed) {
  return {
    inventory: {},
    money: 0,
    day: 1,
    logs: [],
    rng: new RNG(seed),
    flags: { gathered: false, crafted: false, sold: false }
  };
}

export function runSimulation(runs = 500, days = 100) {
  let totalProfit = 0;
  let bankruptcies = 0;
  let totalTurnover = 0;

  for (let r = 0; r < runs; r++) {
    const state = createSimState(r + 1);
    let sold = 0;
    let inventoryAccum = 0;
    let bankrupted = false;

    for (let d = 0; d < days; d++) {
      gather(state, data);
      craft(state, data);
      const beforeMoney = state.money;
      sell(state, data);
      const afterMoney = state.money;
      if (afterMoney > beforeMoney) sold += 1;
      const inventoryTotal = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      inventoryAccum += inventoryTotal;
      if (state.money < 0) bankrupted = true;
    }

    const avgInventory = inventoryAccum / days;
    const turnover = avgInventory > 0 ? sold / avgInventory : 0;
    totalTurnover += turnover;
    totalProfit += state.money;
    if (bankrupted) bankruptcies += 1;
  }

  return {
    averageProfit: totalProfit / runs,
    bankruptcyRate: bankruptcies / runs,
    averageInventoryTurnover: totalTurnover / runs
  };
}
