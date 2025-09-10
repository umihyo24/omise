
export class Renderer{
  constructor(ctx){ this.ctx = ctx; this.font = "16px ui-monospace, Consolas, monospace"; }
  clear(){ const c=this.ctx.canvas; this.ctx.clearRect(0,0,c.width,c.height); }
  drawFrame(){
    const c=this.ctx.canvas, g=this.ctx;
    g.strokeStyle="#3a3f46"; g.lineWidth=2;
    // 左メニュー
    g.strokeRect(12,12,260,400);
    // 右ステータス
    g.strokeRect(280,12,508,180);
    // 下ログ
    g.strokeRect(12,420,776,168);
  }
  drawPanels(G){
    const g=this.ctx;
    g.fillStyle="#ddd"; g.font=this.font;
    // メニュー
    const tabs = ["拠点","採取","クラフト","店舗"];
    g.fillText(`画面: ${tabs[G.ui.tab]}  (Tabで切替)`, 24, 36);
    const menu = ["[Enter] 決定","↑↓ カーソル移動","Tab 画面切替",""];
    menu.forEach((t,i)=> g.fillText(t, 24, 70+i*22));
    // ステータス
    let y=40;
    g.fillText(`日付: ${G.calendar.day}日  天候: ${G.world.weather}`, 296, y); y+=24;
    g.fillText(`体力: ${G.player.stamina}`, 296, y); y+=24;
    g.fillText(`所持金: ${G.money}`, 296, y); y+=24;
    g.fillText(`在庫: ガラス:${G.inv.glass||0} / 石鹸:${G.inv.soap||0} / 砂:${G.inv.sand||0} / 油:${G.inv.oil||0}`, 296, y);
    // ログ
    const log = G.ui.log.slice(-6);
    log.forEach((t,i)=> g.fillText(t, 24, 452+i*22));
  }
}
