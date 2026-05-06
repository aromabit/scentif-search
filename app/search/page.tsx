"use client"

import { Suspense, useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { searchMeasurements, measurements as allMeasurements } from "@/data/measurements"
import { ResultCard } from "@/components/search/ResultCard"
import { MeasureModal } from "@/components/search/MeasureModal"

const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
        color: "#999",
      }}
    >
      地図を読み込み中...
    </div>
  ),
})

function ScentifLogo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: -1,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <span style={{ color: "#4285f4" }}>S</span>
      <span style={{ color: "#ea4335" }}>c</span>
      <span style={{ color: "#fbbc05" }}>e</span>
      <span style={{ color: "#4285f4" }}>n</span>
      <span style={{ color: "#34a853" }}>t</span>
      <span style={{ color: "#ea4335" }}>i</span>
      <span style={{ color: "#4285f4" }}>f</span>
    </button>
  )
}

function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""

  const results = useMemo(() => searchMeasurements(query), [query])
  const [selectedEntry, setSelectedEntry] = useState<{ query: string; id: string | null }>(() => ({
    query,
    id: searchMeasurements(query)[0]?.id ?? null,
  }))
  const [showMeasureModal, setShowMeasureModal] = useState(false)

  const selectedId = selectedEntry.query === query ? selectedEntry.id : (results[0]?.id ?? null)
  function setSelectedId(id: string | null) {
    setSelectedEntry({ query, id })
  }

  function handleMeasureComplete() {
    setShowMeasureModal(false)
    const r = allMeasurements[Math.floor(Math.random() * allMeasurements.length)]
    router.push(`/search?q=${encodeURIComponent(r.scentType.split("・")[0])}`)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "white" }}>
      {showMeasureModal && (
        <MeasureModal
          onComplete={handleMeasureComplete}
          onClose={() => setShowMeasureModal(false)}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          borderBottom: "1px solid #e8e8e8",
          gap: 16,
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,.1)",
          zIndex: 10,
        }}
      >
        <ScentifLogo onClick={() => router.push("/")} />

        <button
          onClick={() => setShowMeasureModal(true)}
          style={{
            padding: "8px 24px",
            background: "#4285f4",
            border: "none",
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 700,
            color: "white",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(66,133,244,.35)",
          }}
        >
          測定
        </button>
      </div>

      <div style={{ padding: "6px 16px 6px 24px", fontSize: 13, color: "#70757a", borderBottom: "1px solid #e8e8e8" }}>
        「{query}」の測定記録 — {results.length} 件
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: 380,
            minWidth: 280,
            overflowY: "auto",
            borderRight: "1px solid #e8e8e8",
            flexShrink: 0,
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "#70757a" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}>該当する測定記録が見つかりませんでした</div>
              <div style={{ fontSize: 13 }}>別のキーワードで試してみてください</div>
              <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {["公園", "海", "市場", "雨上がり"].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => router.push(`/search?q=${encodeURIComponent(kw)}`)}
                    style={{
                      padding: "6px 14px",
                      background: "white",
                      border: "1px solid #dfe1e5",
                      borderRadius: 20,
                      fontSize: 13,
                      color: "#1a0dab",
                      cursor: "pointer",
                    }}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            results.map((m) => (
              <ResultCard
                key={m.id}
                measurement={m}
                selected={m.id === selectedId}
                onClick={() => setSelectedId(m.id)}
              />
            ))
          )}
        </div>

        <div style={{ flex: 1, position: "relative" }}>
          {results.length === 0 ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f9fa",
                color: "#9aa0a6",
                fontSize: 14,
              }}
            >
              検索すると地図に表示されます
            </div>
          ) : (
            <MapView
              measurements={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  )
}
