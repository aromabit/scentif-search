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
    const r =
      allMeasurements[Math.floor(Math.random() * allMeasurements.length)]
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
          background: "#FAF9F7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          padding: "72px 16px 48px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: -1.5,
              color: "#1A1915",
            }}
          >
            Scentif search
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#8C7B6B",
              marginTop: 6,
              fontWeight: 400,
            }}
          >
            匂い測定記録を探そう
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setShowMeasureModal(true)}
              style={{
                padding: "14px 44px",
                background: "#D97757",
                border: "none",
                borderRadius: 28,
                fontSize: 16,
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(217,119,87,.35)",
                letterSpacing: 1,
                transition: "box-shadow 0.15s, transform 0.1s",
              }}
            >
              測定する
            </button>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {SUGGESTIONS.map((kw) => (
              <button
                key={kw}
                onClick={() => handleSearch(kw)}
                style={{
                  padding: "6px 16px",
                  background: "white",
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

        <div style={{ width: "100%", maxWidth: 560 }}>
          <div
            style={{
              fontSize: 12,
              color: "#8C7B6B",
              marginBottom: 10,
              paddingLeft: 2,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            最新の測定記録
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              border: "1.5px solid #E5E0D8",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,.04)",
            }}
          >
            {[...allMeasurements]
              .sort(
                (a, b) =>
                  new Date(b.measuredAt).getTime() -
                  new Date(a.measuredAt).getTime()
              )
              .map((m, idx, arr) => {
                const dt = new Date(m.measuredAt)
                const dateStr = dt.toLocaleDateString("ja-JP", {
                  month: "2-digit",
                  day: "2-digit",
                })
                const timeStr = dt.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                return (
                  <div
                    key={m.id}
                    onClick={() => handleSearch(m.locationName)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleSearch(m.locationName)
                    }}
                    style={{
                      padding: "12px 16px",
                      borderBottom:
                        idx < arr.length - 1 ? "1px solid #F0EDE8" : "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "#8C7B6B",
                        whiteSpace: "nowrap",
                        paddingTop: 2,
                      }}
                    >
                      {dateStr} {timeStr}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1A1915",
                          marginBottom: 2,
                        }}
                      >
                        {m.locationName}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#8C7B6B",
                          display: "flex",
                          gap: 10,
                        }}
                      >
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
      </div>
    </>
  )
}
