"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { searchMeasurements, measurements as allMeasurements, Measurement } from "@/data/measurements"

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

function IntensityBar({ value }: { value: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i <= value ? "#4285f4" : "#dfe1e5",
          }}
        />
      ))}
      <span style={{ color: "#555", fontSize: 11, marginLeft: 4 }}>{value}/5</span>
    </span>
  )
}

function ResultCard({
  measurement,
  selected,
  onClick,
}: {
  measurement: Measurement
  selected: boolean
  onClick: () => void
}) {
  const dt = new Date(measurement.measuredAt)
  const dateStr = dt.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })
  const timeStr = dt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })

  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #e8e8e8",
        cursor: "pointer",
        background: selected ? "#e8f0fe" : "white",
        borderLeft: selected ? "3px solid #1a73e8" : "3px solid transparent",
        transition: "background 0.15s",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 15, color: "#1a0dab", marginBottom: 2 }}>
        {measurement.locationName}
      </div>
      <div style={{ fontSize: 12, color: "#70757a", marginBottom: 6 }}>{measurement.address}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#444" }}>
          📅 {dateStr} {timeStr}
        </span>
        <span style={{ fontSize: 12, color: "#444" }}>
          🌡 {measurement.temperature}°C
        </span>
        <span style={{ fontSize: 12, color: "#444" }}>
          💧 湿度{measurement.humidity}%
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            background: "#f1f3f4",
            color: "#555",
            padding: "2px 8px",
            borderRadius: 12,
          }}
        >
          {measurement.scentType}
        </span>
        <IntensityBar value={measurement.intensity} />
      </div>

      <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{measurement.notes}</div>
    </div>
  )
}

function MeasureModal({ onComplete, onClose }: { onComplete: () => void; onClose: () => void }) {
  const [phase, setPhase] = useState<"ready" | "measuring" | "done">("ready")

  function start() {
    setPhase("measuring")
    setTimeout(() => {
      setPhase("done")
      setTimeout(onComplete, 800)
    }, 1800)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 16, padding: "36px 40px",
          width: 320, textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,.18)",
        }}
      >
        {phase === "ready" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👃</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>匂いを測定する</div>
            <div style={{ fontSize: 13, color: "#70757a", marginBottom: 28 }}>
              現在地の匂いをセンサーで計測します
            </div>
            <button
              onClick={start}
              style={{
                width: "100%", padding: "12px 0", background: "#4285f4",
                border: "none", borderRadius: 8, color: "white",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}
            >
              測定開始
            </button>
          </>
        )}
        {phase === "measuring" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16, animation: "spin 1s linear infinite" }}>🌀</div>
            <div style={{ fontSize: 15, color: "#555" }}>測定中...</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </>
        )}
        {phase === "done" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 15, color: "#34a853", fontWeight: 600 }}>測定完了</div>
          </>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const [query, setQuery] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState<Measurement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [showMeasureModal, setShowMeasureModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!hasSearched) inputRef.current?.focus()
  }, [hasSearched])

  function handleSearch(q: string) {
    const trimmed = q.trim()
    if (!trimmed) return
    setQuery(trimmed)
    const found = searchMeasurements(trimmed)
    setResults(found)
    setSelectedId(found[0]?.id ?? null)
    setHasSearched(true)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch(inputValue)
  }

  function handleSuggestion(keyword: string) {
    setInputValue(keyword)
    handleSearch(keyword)
  }

  const handleMeasureComplete = useCallback(() => {
    setShowMeasureModal(false)
    const r = allMeasurements[Math.floor(Math.random() * allMeasurements.length)]
    handleSuggestion(r.scentType.split("・")[0])
  }, [])

  if (!hasSearched) {
    return (
      <>
      {showMeasureModal && (
        <MeasureModal
          onComplete={handleMeasureComplete}
          onClose={() => setShowMeasureModal(false)}
        />
      )}
      <div
        style={{
          minHeight: "100vh",
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          padding: "64px 16px 48px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -2 }}>
            <span style={{ color: "#4285f4" }}>S</span>
            <span style={{ color: "#ea4335" }}>c</span>
            <span style={{ color: "#fbbc05" }}>e</span>
            <span style={{ color: "#4285f4" }}>n</span>
            <span style={{ color: "#34a853" }}>t</span>
            <span style={{ color: "#ea4335" }}>i</span>
            <span style={{ color: "#4285f4" }}>f</span>
          </div>
          <div style={{ fontSize: 14, color: "#70757a", marginTop: 4 }}>
            匂い測定記録を探そう
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 584 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setShowMeasureModal(true)}
              style={{
                padding: "16px 48px",
                background: "#4285f4",
                border: "none",
                borderRadius: 32,
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(66,133,244,.4)",
                letterSpacing: 2,
              }}
            >
              👃 測定
            </button>
          </div>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {["公園", "海", "市場", "雨上がり", "夜"].map((kw) => (
              <button
                key={kw}
                onClick={() => handleSuggestion(kw)}
                style={{
                  padding: "6px 16px",
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

        <div style={{ width: "100%", maxWidth: 584 }}>
          <div style={{ fontSize: 13, color: "#70757a", marginBottom: 8, paddingLeft: 4 }}>最新の測定記録</div>
          {[...allMeasurements]
            .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())
            .map((m) => {
              const dt = new Date(m.measuredAt)
              const dateStr = dt.toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" })
              const timeStr = dt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
              return (
                <div
                  key={m.id}
                  onClick={() => handleSuggestion(m.locationName)}
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #e8e8e8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <div style={{ fontSize: 11, color: "#70757a", whiteSpace: "nowrap", paddingTop: 2 }}>
                    {dateStr} {timeStr}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a0dab", marginBottom: 2 }}>
                      {m.locationName}
                    </div>
                    <div style={{ fontSize: 12, color: "#555", display: "flex", gap: 10 }}>
                      <span>{m.scentType}</span>
                      <span>{m.temperature}°C</span>
                      <span>湿度{m.humidity}%</span>
                    </div>
                  </div>
                  <IntensityBar value={m.intensity} />
                </div>
              )
            })}
        </div>
      </div>
      </>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "white" }}>
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
        <button
          onClick={() => { setHasSearched(false); setInputValue("") }}
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
          👃 測定
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
                    onClick={() => handleSuggestion(kw)}
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
