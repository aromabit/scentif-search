import "./reset.css"
import "leaflet/dist/leaflet.css"

export const metadata = {
  title: "Scentif Search",
  description: "香りのお店を探せる検索サービス",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
export default RootLayout
