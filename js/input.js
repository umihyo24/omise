
const pressed = new Set();
let lastOnce = null;

export function initInput(){
  window.addEventListener("keydown", (e)=>{
    if (["ArrowUp","ArrowDown","Enter","Tab","Escape"].includes(e.key)) {
      pressed.add(e.key);
      lastOnce = e.key;
      e.preventDefault();
    }
  }, {passive:false});
  window.addEventListener("keyup", (e)=> pressed.delete(e.key));
  return { };
}
export function getInputOnce(){ const k = lastOnce; lastOnce = null; return k; }
export function clearPressed(){ pressed.clear(); }
