import { RNG } from '../rng.js';

export function createState(seed) {
  const raw = localStorage.getItem('omise-save');
  if (raw) {
    const obj = JSON.parse(raw);
    obj.rng = new RNG(seed);
    return obj;
  }
  return {
    tabIndex: 0,
    tabs: ['home', 'gather', 'craft', 'shop'],
    menuIndex: 0,
    logs: [],
    inventory: {},
    money: 0,
    day: 1,
    reputation: 0,
    rng: new RNG(seed),
    flags: { gathered: false, crafted: false, sold: false }
  };
}

export function saveState(state) {
  const copy = { ...state };
  delete copy.rng;
  localStorage.setItem('omise-save', JSON.stringify(copy));
}
