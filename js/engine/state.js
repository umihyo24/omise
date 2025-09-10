import { seeded } from "../rng.js";
import { makeData } from "./data.js";

export function newGameState(){
  const data = makeData();
  return {
    data,
    rng: seeded(12345),
    calendar: { day: 1, season: "spring" },
    world: { weather: "sunny", reputation: 0 },
    player: { stamina: 100, skill: 1 },
    money: 200,
    inv: { sand: 5, oil: 2, glass:0, soap:0 },
    ui: { tab: 0, cursor: 0, log: ["— 初日 —"], message:"" }
  };
}
export function nextDay(G){
  G.calendar.day++;
  // 超簡易：天候ローテ
  const order = ["sunny","rainy","storm","sunny","sunny","rainy"];
  G.world.weather = order[G.calendar.day % order.length];
  G.player.stamina = Math.min(100, G.player.stamina+20);
}
