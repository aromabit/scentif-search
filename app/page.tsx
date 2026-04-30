"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { measurements as allMeasurements } from "@/data/measurements"
import { IntensityBar } from "@/components/search/IntensityBar"
import { MeasureModal } from "@/components/search/MeasureModal"

const SUGGESTIONS = ["公園", "海", "市場", "雨上がり", "夜"]

export default function Page() {
  const router = useRouter()
  const [showMeasureModal, setShowMeasureModal] = useState(false)

  function handleSearch(q: string) {
    const trimmed = q.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  function handleMeasureComplete() {
    setShowMeasureModal(false)
    const r = allMeasurements[Math.floor(Math.random() * allMeasurements.length)]
    router.push(`/search?q=${encodeURIComponent(r.scentType.split("・")[0])}`)
  }

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
              測定
            </button>
          </div>

          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {SUGGESTIONS.map((kw) => (
              <button
                key={kw}
                onClick={() => handleSearch(kw)}
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
                  onClick={() => handleSearch(m.locationName)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSearch(m.locationName) }}
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
