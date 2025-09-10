import { createState, saveState } from './engine/state.js';
import { data } from './engine/data.js';
import { draw } from './renderer.js';
import { setupInput } from './input.js';
import { gather, craft, sell } from './engine/systems.js';
import { runSimulation } from './engine/sim.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const seed = Number(new URLSearchParams(window.location.search).get('seed')) || Date.now();
const state = createState(seed);
const simSummary = runSimulation();

function getMenuOptions() {
  const tab = state.tabs[state.tabIndex];
  if (tab === 'gather') {
    return state.flags.gathered ? ['採取済み'] : ['高嶺の森'];
  } else if (tab === 'craft') {
    if (state.flags.crafted) return ['クラフト済み'];
    return state.inventory['tsuchi-ishi'] ? ['護符加工'] : ['材料不足'];
  } else if (tab === 'shop') {
    if (state.flags.sold) return ['販売済み'];
    return state.inventory['stone-charm'] ? ['石護符を売る'] : ['商品なし'];
  }
  return ['Tabで画面切替'];
}

function onSelect() {
  const tab = state.tabs[state.tabIndex];
  if (tab === 'gather' && !state.flags.gathered) {
    gather(state, data);
  } else if (tab === 'craft' && !state.flags.crafted) {
    craft(state, data);
  } else if (tab === 'shop' && !state.flags.sold) {
    sell(state, data);
  }
  saveState(state);
}

setupInput(state, getMenuOptions, onSelect);

function loop() {
  draw(ctx, state, getMenuOptions(), simSummary);
  requestAnimationFrame(loop);
}
loop();
