
export function makeData(){
  // 超最小のサンプル：砂→ガラス、油→石鹸（※安全配慮で抽象化）
  return {
    materials: [
      {id:"sand", name_ja:"砂", name_en:"sand"},
      {id:"oil",  name_ja:"植物油", name_en:"vegetable_oil"}
    ],
    items: [
      {id:"glass", name_ja:"ガラス", name_en:"glass"},
      {id:"soap",  name_ja:"石鹸",   name_en:"soap"}
    ],
    recipes: [
      {
        id:"glass_basic", name_ja:"ガラス基礎精製",
        inputs:[{id:"sand",qty:2}],
        outputs:[{id:"glass",qty:1}],
        tools:["炉"], conditions:{tempC:1200,timeMin:60,notes:"現実は高温。ゲームでは抽象化"},
        safety_notes:"高温工程のため抽象化し詳細省略"
      },
      {
        id:"soap_basic", name_ja:"石鹸の素",
        inputs:[{id:"oil",qty:1}],
        outputs:[{id:"soap",qty:1}],
        tools:["鍋"], conditions:{tempC:70,timeMin:30,notes:"苛性ソーダ工程は抽象化"},
        safety_notes:"薬品工程は抽象化。詳細配合は非表示"
      }
    ],
    demand:{
      glass: { base: 5, season:{spring:1,summer:1.1,autumn:0.9,winter:1}, weather:{sunny:1,rainy:1,storm:0.8} },
      soap:  { base: 4, season:{spring:1,summer:1.2,autumn:1,winter:0.9}, weather:{sunny:1,rainy:1.1,storm:0.9} }
    },
    prices:{ glass:{buy:0, sell:30}, soap:{buy:0, sell:22} }
  };
}
