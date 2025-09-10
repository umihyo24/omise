import { initInput, getInputOnce, clearPressed } from "./input.js";
import { Renderer } from "./renderer.js";
import { newGameState, nextDay } from "./engine/state.js";
import { Systems } from "./engine/systems.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const input = initInput();
const ren = new Renderer(ctx);
const sys = new Systems();

const G = newGameState();

function tick(ts){
  update(1/60);
  render();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function update(dt){
  const key = getInputOnce();
  if(key === "Tab") {
    const tabs = ["拠点","採取","クラフト","店舗"];
    G.ui.tab = (G.ui.tab + 1) % tabs.length;
    G.ui.message = `画面: ${tabs[G.ui.tab]}`;
  }
  if(key === "ArrowUp")    G.ui.cursor = Math.max(0, G.ui.cursor-1);
  if(key === "ArrowDown")  G.ui.cursor = Math.min(3, G.ui.cursor+1);

  if(key === "Enter"){
    const tab = G.ui.tab;
    if(tab===0){ // 拠点
      G.ui.log.push("休息して体力を少し回復した。");
      G.player.stamina = Math.min(100, G.player.stamina+10);
    }else if(tab===1){ // 採取
      const r = sys.gatherOnce(G);
      G.ui.log.push(`採取: ${r.msg}`);
    }else if(tab===2){ // クラフト
      const r = sys.craftOnce(G);
      G.ui.log.push(`クラフト: ${r.msg}`);
    }else if(tab===3){ // 店舗
      const r = sys.sellOnce(G);
      G.ui.log.push(`販売: ${r.msg}`);
      nextDay(G);
      G.ui.log.push(`— 翌日(${G.calendar.day}) —`);
    }
  }
  clearPressed();
}

function render(){
  ren.clear();
  ren.drawFrame();
  ren.drawPanels(G);
}
