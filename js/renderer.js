export function draw(ctx, state, menuOptions, simSummary) {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, 800, 600);
  ctx.font = '16px monospace';
  // menu
  menuOptions.forEach((opt, i) => {
    ctx.fillStyle = i === state.menuIndex ? '#ff0' : '#fff';
    ctx.fillText(opt, 20, 40 + i * 20);
  });
  // right panel
  ctx.fillStyle = '#fff';
  let y = 40;
  ctx.fillText(`Day: ${state.day}`, 420, y); y += 20;
  ctx.fillText(`Money: ${state.money}`, 420, y); y += 20;
  ctx.fillText('Inventory:', 420, y); y += 20;
  Object.entries(state.inventory).forEach(([id, qty]) => {
    ctx.fillText(`${id}: ${qty}`, 420, y); y += 20;
  });
  if (simSummary) {
    y += 20;
    ctx.fillText(`Avg Profit: ${simSummary.averageProfit.toFixed(1)}`, 420, y); y += 20;
    ctx.fillText(`Bankruptcy: ${(simSummary.bankruptcyRate * 100).toFixed(1)}%`, 420, y); y += 20;
    ctx.fillText(`Inv Turn: ${simSummary.averageInventoryTurnover.toFixed(2)}`, 420, y); y += 20;
  }
  // log
  const start = Math.max(0, state.logs.length - 8);
  state.logs.slice(start).forEach((msg, i) => {
    ctx.fillText(msg, 20, 330 + i * 20);
  });
}
