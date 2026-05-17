"use client"

import { Suspense, useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { searchMeasurements, findSimilarByVector } from "@/data/measurements"
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
        background: "#F5F2EE",
        color: "#8C7B6B",
        fontSize: 14,
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
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: -0.5,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        color: "#1A1915",
      }}
    >
      Scentif search
    </button>
  )
}

function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""
  const measuredAt = searchParams.get("measured_at")
  const vx = searchParams.get("vx")
  const vy = searchParams.get("vy")
  const inputVector: [number, number] | null =
    vx !== null && vy !== null ? [parseFloat(vx), parseFloat(vy)] : null

  const results = useMemo(
    () =>
      inputVector
        ? findSimilarByVector(inputVector)
        : searchMeasurements(query),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, vx, vy]
  )
  const [selectedEntry, setSelectedEntry] = useState<{
    query: string
    id: string | null
  }>(() => {
    const initial = inputVector
      ? findSimilarByVector(inputVector)[0]
      : searchMeasurements(query)[0]
    return { query, id: initial?.id ?? null }
  })
  const [showMeasureModal, setShowMeasureModal] = useState(false)

  const selectedId =
    selectedEntry.query === query ? selectedEntry.id : (results[0]?.id ?? null)
  function setSelectedId(id: string | null) {
    setSelectedEntry({ query, id })
  }

  function handleMeasureComplete(vector: [number, number]) {
    setShowMeasureModal(false)
    const now = new Date().toISOString()
    router.push(
      `/search?vx=${vector[0]}&vy=${vector[1]}&measured_at=${encodeURIComponent(now)}`
    )
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#FAF9F7",
      }}
    >
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
          padding: "10px 20px",
          borderBottom: "1.5px solid #E5E0D8",
          gap: 16,
          background: "white",
          zIndex: 10,
        }}
      >
        <ScentifLogo onClick={() => router.push("/")} />

        <button
          onClick={() => setShowMeasureModal(true)}
          style={{
            padding: "7px 20px",
            background: "#D97757",
            border: "none",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            boxShadow: "0 1px 6px rgba(217,119,87,.3)",
          }}
        >
          測定する
        </button>
      </div>

      <div
        style={{
          padding: "8px 20px",
          fontSize: 12,
          color: "#8C7B6B",
          borderBottom: "1px solid #E5E0D8",
          background: "white",
        }}
      >
        {inputVector
          ? `${measuredAt ? new Date(measuredAt).toLocaleString("ja-JP", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) + "の" : ""}測定値に近い記録 — ${results.length} 件`
          : `「${query}」に近い測定記録 — ${results.length} 件`
        }
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: 380,
            minWidth: 280,
            overflowY: "auto",
            borderRight: "1.5px solid #E5E0D8",
            flexShrink: 0,
            background: "#F5F2EE",
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#8C7B6B" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
              <div
                style={{
                  fontSize: 15,
                  marginBottom: 8,
                  color: "#1A1915",
                  fontWeight: 500,
                }}
              >
                測定記録が見つかりませんでした
              </div>
              <div style={{ fontSize: 13 }}>
                別のキーワードで試してみてください
              </div>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {["公園", "海", "市場", "雨上がり"].map((kw) => (
                  <button
                    key={kw}
                    onClick={() =>
                      router.push(`/search?q=${encodeURIComponent(kw)}`)
                    }
                    style={{
                      padding: "6px 14px",
                      background: "#FAF9F7",
                      border: "1.5px solid #E5E0D8",
                      borderRadius: 20,
                      fontSize: 13,
                      color: "#5C4F44",
                      cursor: "pointer",
                      fontWeight: 500,
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
                background: "#F5F2EE",
                color: "#8C7B6B",
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
