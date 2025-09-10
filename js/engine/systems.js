
export class Systems{
  gatherOnce(G){
    if(G.player.stamina < 10) return {ok:false,msg:"体力不足で採取できない"};
    G.player.stamina -= 10;
    // 天候補正：雨なら砂-1、油+0（仮）
    let sandGain = (G.world.weather==="storm")?0:1;
    G.inv.sand = (G.inv.sand||0) + sandGain;
    // 低確率で油
    if(rand(G) < 0.25) G.inv.oil = (G.inv.oil||0) + 1;
    return {ok:true,msg:`砂+${sandGain}${(G.inv.oil&&rand(G)<0.5)?" / 油+1":""}`};
  }
  craftOnce(G){
    // 優先：ガラス→石鹸
    const rGlass = canDo("glass_basic", G);
    if(rGlass){ useInputs(rGlass, G); addOutputs(rGlass, G); return {ok:true,msg:"ガラスを精製した"}; }
    const rSoap = canDo("soap_basic", G);
    if(rSoap){ useInputs(rSoap, G); addOutputs(rSoap, G); return {ok:true,msg:"石鹸を作った"}; }
    return {ok:false,msg:"材料が足りない"};
  }
  sellOnce(G){
    // 需要= base * season * weather（評判は未導入）
    const d = G.data.demand;
    let sold=0, money=0;
    for(const id of ["glass","soap"]){
      const have = G.inv[id]||0; if(!have) continue;
      const dm = d[id];
      const demandToday = Math.round(dm.base * dm.season.spring * dm.weather[G.world.weather]);
      const q = Math.min(have, demandToday);
      G.inv[id] -= q; sold += q;
      const price = G.data.prices[id].sell;
      money += q*price;
    }
    G.money += money;
    return {ok:true,msg:`${sold}個を販売して${money}G稼いだ`};
  }
}

function rand(G){ return G.rng(); }

function canDo(recipeId, G){
  const r = G.data.recipes.find(x=>x.id===recipeId); if(!r) return null;
  for(const inp of r.inputs){
    if((G.inv[inp.id]||0) < inp.qty) return null;
  }
  return r;
}
function useInputs(r,G){ for(const inp of r.inputs){ G.inv[inp.id]-=inp.qty; } }
function addOutputs(r,G){ for(const o of r.outputs){ G.inv[o.id]=(G.inv[o.id]||0)+o.qty; } }

