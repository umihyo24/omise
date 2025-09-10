export const data = {
  locations: [
    { id: 'takane-forest', name: '高嶺の森' }
  ],
  gatherEvents: {
    'takane-forest': [
      { roll_low: 1, roll_high: 10, action: '落ち枝を拾う', loot_table_id: 'lt-forest-common' },
      { roll_low: 11, roll_high: 20, action: '湿った藪を探す', loot_table_id: 'lt-forest-rain' },
      { roll_low: 21, roll_high: 100, action: '河原の石を集める', loot_table_id: 'lt-forest-common' }
    ]
  },
  lootTables: {
    'lt-forest-common': [
      { item_id: 'tsuchi-ishi', weight: 50, qty_min: 1, qty_max: 2 },
      { item_id: 'hinoki-leaf', weight: 50, qty_min: 1, qty_max: 3 }
    ],
    'lt-forest-rain': [
      { item_id: 'hinoki-leaf', weight: 70, qty_min: 1, qty_max: 3 },
      { item_id: 'tsuchi-ishi', weight: 20, qty_min: 1, qty_max: 2 },
      { item_id: 'rare-mushroom', weight: 10, qty_min: 1, qty_max: 2 }
    ]
  },
  recipes: [
    {
      id: 'make-stone-charm',
      name: '護符加工',
      input: [{ id: 'tsuchi-ishi', qty: 1 }],
      output: [{ id: 'stone-charm', qty: 1 }]
    }
  ],
  items: {
    'tsuchi-ishi': { name: '土石' },
    'hinoki-leaf': { name: '檜葉' },
    'rare-mushroom': { name: '珍しいキノコ' },
    'stone-charm': { name: '石護符', base_price: 50 }
  }
};
