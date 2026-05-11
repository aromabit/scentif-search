export type Measurement = {
  id: string
  locationName: string
  address: string
  measuredAt: string // ISO 8601
  temperature: number // °C
  humidity: number // %
  illuminance: number // lx
  windSpeed: number // m/s
  soundLevel: number // dB
  scentType: string
  intensity: number // 1–5
  notes: string
  lat: number
  lng: number
  imageUrl?: string
}

export const measurements: Measurement[] = [
  {
    id: "1",
    locationName: "代々木公園 北入口付近",
    address: "東京都渋谷区代々木神園町2",
    measuredAt: "2026-04-28T09:15:00+09:00",
    temperature: 18.3,
    humidity: 62,
    illuminance: 12400,
    windSpeed: 1.2,
    soundLevel: 48,
    scentType: "草・土・新緑",
    intensity: 3,
    notes: "朝露残り、芝生と腐葉土の混合香。風弱く拡散少なめ。",
    lat: 35.6717,
    lng: 139.6952,
    imageUrl: "https://picsum.photos/seed/yoyogi/600/300",
  },
  {
    id: "2",
    locationName: "築地場外市場 中央通り",
    address: "東京都中央区築地4-16",
    measuredAt: "2026-04-28T07:40:00+09:00",
    temperature: 16.1,
    humidity: 71,
    illuminance: 8200,
    windSpeed: 2.1,
    soundLevel: 72,
    scentType: "海産物・塩・焼き魚",
    intensity: 5,
    notes: "水産業者の搬入時間帯。鰹節だしと磯の香りが混在。",
    lat: 35.6655,
    lng: 139.7706,
    imageUrl: "https://picsum.photos/seed/tsukiji/600/300",
  },
  {
    id: "3",
    locationName: "六義園 梅林",
    address: "東京都文京区本駒込6-16-3",
    measuredAt: "2026-02-12T11:30:00+09:00",
    temperature: 9.4,
    humidity: 48,
    illuminance: 31000,
    windSpeed: 3.4,
    soundLevel: 42,
    scentType: "梅・甘花",
    intensity: 4,
    notes: "白梅8割開花。南風時に強く香る。紅梅はやや控えめ。",
    lat: 35.7328,
    lng: 139.7466,
    imageUrl: "https://picsum.photos/seed/rikugien/600/300",
  },
  {
    id: "4",
    locationName: "渋谷スクランブル交差点",
    address: "東京都渋谷区道玄坂2-1",
    measuredAt: "2026-04-27T19:00:00+09:00",
    temperature: 21.7,
    humidity: 55,
    illuminance: 4800,
    windSpeed: 0.5,
    soundLevel: 85,
    scentType: "排気ガス・食品・香水",
    intensity: 5,
    notes: "ピーク人流時。屋台の焼き鳥とフライドポテトが支配的。香水は歩行者通過で断片的に検出。",
    lat: 35.6595,
    lng: 139.7005,
    imageUrl: "https://picsum.photos/seed/shibuya/600/300",
  },
  {
    id: "5",
    locationName: "浜離宮恩賜庭園 潮入の池",
    address: "東京都中央区浜離宮庭園1-1",
    measuredAt: "2026-04-29T14:20:00+09:00",
    temperature: 22.8,
    humidity: 67,
    illuminance: 45000,
    windSpeed: 4.2,
    soundLevel: 55,
    scentType: "海水・松脂・菜の花",
    intensity: 3,
    notes: "満潮後2時間。潮香と松林の樹脂香が重なる。菜の花花壇から甘味を補足。",
    lat: 35.6558,
    lng: 139.7634,
    imageUrl: "https://picsum.photos/seed/hamarikyu/600/300",
  },
  {
    id: "6",
    locationName: "神楽坂 石畳路地",
    address: "東京都新宿区神楽坂3",
    measuredAt: "2026-04-26T20:30:00+09:00",
    temperature: 17.5,
    humidity: 59,
    illuminance: 320,
    windSpeed: 0.3,
    soundLevel: 61,
    scentType: "出汁・醤油・木材",
    intensity: 4,
    notes: "料亭密集エリア。老舗の鰹だし排気と古い木造建築の材木香。雨上がり直後で土香も混入。",
    lat: 35.7019,
    lng: 139.7395,
    imageUrl: "https://picsum.photos/seed/kagurazaka/600/300",
  },
  {
    id: "7",
    locationName: "お台場海浜公園 砂浜",
    address: "東京都品川区東八潮1",
    measuredAt: "2026-04-29T16:45:00+09:00",
    temperature: 24.1,
    humidity: 70,
    illuminance: 52000,
    windSpeed: 5.8,
    soundLevel: 63,
    scentType: "海・潮・日焼け止め",
    intensity: 4,
    notes: "北東風強め。東京湾特有のやや工業的な塩香。来場者の日焼け止めが後追いで検出。",
    lat: 35.6296,
    lng: 139.7747,
    imageUrl: "https://picsum.photos/seed/odaiba/600/300",
  },
  {
    id: "8",
    locationName: "谷根千 谷中銀座商店街",
    address: "東京都台東区谷中3-13",
    measuredAt: "2026-04-27T12:10:00+09:00",
    temperature: 20.2,
    humidity: 52,
    illuminance: 28000,
    windSpeed: 1.5,
    soundLevel: 68,
    scentType: "揚げ物・線香・焼き菓子",
    intensity: 4,
    notes: "昼前ピーク。コロッケ店の揚げ油香が最強。仏具店隣接区画で線香香が交差。",
    lat: 35.7268,
    lng: 139.7681,
    imageUrl: "https://picsum.photos/seed/yanaka/600/300",
  },
  {
    id: "9",
    locationName: "井の頭公園 ボート池畔",
    address: "東京都武蔵野市御殿山1-18",
    measuredAt: "2026-04-28T08:55:00+09:00",
    temperature: 15.8,
    humidity: 74,
    illuminance: 9500,
    windSpeed: 0.8,
    soundLevel: 44,
    scentType: "水面・苔・桜残香",
    intensity: 2,
    notes: "散桜後5日。水面の微生物活動による土臭と、枯れ始めた桜花弁の甘い腐敗香が微量混合。",
    lat: 35.6996,
    lng: 139.5752,
    imageUrl: "https://picsum.photos/seed/inokashira/600/300",
  },
  {
    id: "10",
    locationName: "銀座 並木通り",
    address: "東京都中央区銀座7-9",
    measuredAt: "2026-04-27T15:30:00+09:00",
    temperature: 23.4,
    humidity: 44,
    illuminance: 18000,
    windSpeed: 2.3,
    soundLevel: 70,
    scentType: "高級香水・皮革・コーヒー",
    intensity: 3,
    notes: "ブティック集中エリア。ショップ入口から漏れる展示香が断続的に検出。カフェテラス由来のエスプレッソ香と競合。",
    lat: 35.6693,
    lng: 139.7638,
    imageUrl: "https://picsum.photos/seed/ginza/600/300",
  },
]

export function searchMeasurements(query: string): Measurement[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return measurements.filter(
    (m) =>
      m.locationName.toLowerCase().includes(q) ||
      m.address.toLowerCase().includes(q) ||
      m.scentType.toLowerCase().includes(q) ||
      m.notes.toLowerCase().includes(q)
  )
}
