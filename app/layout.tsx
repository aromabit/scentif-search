import "./reset.css"
import "leaflet/dist/leaflet.css"

export const metadata = {
  title: "Scentif Search",
  description: "匂いを検索できるサービス",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
export default RootLayout
