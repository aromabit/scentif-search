export type Shop = {
  id: string
  name: string
  address: string
  description: string
  category: string
  lat: number
  lng: number
  rating: number
  reviewCount: number
}

export const shops: Shop[] = [
  {
    id: "1",
    name: "アロマ東京 銀座店",
    address: "東京都中央区銀座4-6-16",
    description: "上質なエッセンシャルオイルと天然香料を取り揃えた専門店。フランス産ローズやジャスミンが人気。",
    category: "アロマショップ",
    lat: 35.6714,
    lng: 139.7651,
    rating: 4.5,
    reviewCount: 312,
  },
  {
    id: "2",
    name: "香水専門店 PARFUMERIE",
    address: "東京都渋谷区表参道3-18-20",
    description: "国内外200種類以上の香水を取り扱う。調香師によるオリジナルブレンドサービスあり。",
    category: "パフュームショップ",
    lat: 35.6654,
    lng: 139.7101,
    rating: 4.7,
    reviewCount: 489,
  },
  {
    id: "3",
    name: "ナチュラルセント 代官山",
    address: "東京都渋谷区代官山町12-14",
    description: "オーガニック認証済みの天然素材のみ使用。アロマテラピー体験ができるカフェ併設。",
    category: "オーガニックアロマ",
    lat: 35.6498,
    lng: 139.7032,
    rating: 4.3,
    reviewCount: 201,
  },
  {
    id: "4",
    name: "匂い処 京橋",
    address: "東京都中央区京橋1-10-7",
    description: "和の香りに特化した専門店。線香、お香、和精油を中心に伝統的な調合方法で製造。",
    category: "和香料",
    lat: 35.6765,
    lng: 139.7699,
    rating: 4.6,
    reviewCount: 178,
  },
  {
    id: "5",
    name: "SCENT LAB 六本木",
    address: "東京都港区六本木6-10-1",
    description: "香りのサイエンスをテーマにしたラボスタイルショップ。分子香水や未来型フレグランス体験。",
    category: "フレグランスラボ",
    lat: 35.6628,
    lng: 139.7321,
    rating: 4.4,
    reviewCount: 356,
  },
  {
    id: "6",
    name: "フラワー&アロマ 青山",
    address: "東京都港区南青山5-8-3",
    description: "生花と連動したフローラルアロマが特徴。季節の花をモチーフにした限定コレクションが人気。",
    category: "フローラルアロマ",
    lat: 35.6646,
    lng: 139.7167,
    rating: 4.2,
    reviewCount: 143,
  },
  {
    id: "7",
    name: "DIY香水工房 下北沢",
    address: "東京都世田谷区北沢2-6-12",
    description: "自分だけの香水を作れる体験型ショップ。インストラクターが丁寧にサポート。",
    category: "体験型ショップ",
    lat: 35.6612,
    lng: 139.6669,
    rating: 4.8,
    reviewCount: 527,
  },
  {
    id: "8",
    name: "癒し空間 アロマテリア",
    address: "東京都新宿区新宿3-38-2",
    description: "アロマセラピーサロンとショップの複合施設。マッサージオイルのオーダーメイドが人気。",
    category: "アロマサロン",
    lat: 35.6897,
    lng: 139.7007,
    rating: 4.1,
    reviewCount: 264,
  },
  {
    id: "9",
    name: "ESSENCE 恵比寿",
    address: "東京都渋谷区恵比寿1-24-5",
    description: "プロ仕様の香料素材を一般向けに提供。調香師向け原料から趣味の調香まで幅広く対応。",
    category: "香料専門店",
    lat: 35.6468,
    lng: 139.7104,
    rating: 4.5,
    reviewCount: 198,
  },
  {
    id: "10",
    name: "北欧アロマ ヒュッゲ",
    address: "東京都目黒区中目黒1-3-8",
    description: "北欧スタイルのインテリアアロマ専門店。キャンドルとディフューザーの充実したラインナップ。",
    category: "インテリアアロマ",
    lat: 35.6437,
    lng: 139.6997,
    rating: 4.6,
    reviewCount: 423,
  },
]

export function searchShops(query: string): Shop[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return shops.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q)
  )
}
