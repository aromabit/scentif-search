"use client"

import { useState } from "react"

const DOT_VARIANTS = [
  { c1: "#D97757", c2: "#6B9E8C" },
  { c1: "#6B9E8C", c2: "#C4A882" },
  { c1: "#A0856B", c2: "#D97757" },
  { c1: "#C4A882", c2: "#6B9E8C" },
  { c1: "#8C7B6B", c2: "#D97757" },
]

const DOTS = [
  { v: 0, dur: "2.1s", del: "0.0s" }, { v: 2, dur: "3.4s", del: "1.3s" }, { v: 1, dur: "1.8s", del: "7.2s" },
  { v: 4, dur: "2.9s", del: "4.5s" }, { v: 3, dur: "1.6s", del: "9.1s" }, { v: 0, dur: "3.7s", del: "2.8s" },
  { v: 1, dur: "2.3s", del: "6.0s" }, { v: 4, dur: "1.9s", del: "0.7s" }, { v: 2, dur: "3.1s", del: "5.4s" },
  { v: 3, dur: "2.6s", del: "8.3s" }, { v: 0, dur: "1.7s", del: "3.9s" }, { v: 1, dur: "4.0s", del: "1.1s" },
  { v: 2, dur: "2.4s", del: "7.8s" }, { v: 4, dur: "3.3s", del: "0.4s" }, { v: 3, dur: "1.5s", del: "5.9s" },
  { v: 0, dur: "2.8s", del: "4.2s" }, { v: 2, dur: "3.6s", del: "9.5s" }, { v: 1, dur: "2.0s", del: "2.3s" },
  { v: 4, dur: "1.8s", del: "6.7s" }, { v: 3, dur: "3.9s", del: "0.9s" }, { v: 0, dur: "2.5s", del: "8.6s" },
  { v: 1, dur: "1.6s", del: "3.3s" }, { v: 2, dur: "3.2s", del: "7.0s" }, { v: 4, dur: "2.7s", del: "1.8s" },
  { v: 3, dur: "1.9s", del: "5.2s" }, { v: 0, dur: "4.1s", del: "9.8s" }, { v: 2, dur: "2.2s", del: "4.7s" },
  { v: 1, dur: "3.0s", del: "0.2s" }, { v: 4, dur: "2.6s", del: "6.4s" }, { v: 3, dur: "1.7s", del: "8.9s" },
  { v: 0, dur: "3.5s", del: "3.6s" }, { v: 2, dur: "2.0s", del: "7.5s" }, { v: 1, dur: "4.2s", del: "1.6s" },
  { v: 4, dur: "2.3s", del: "5.7s" }, { v: 3, dur: "3.8s", del: "0.5s" }, { v: 0, dur: "1.5s", del: "9.2s" },
]

export function MeasureModal({ onComplete, onClose }: { onComplete: () => void; onClose: () => void }) {
  const [phase, setPhase] = useState<"ready" | "measuring" | "done">("ready")

  function start() {
    setPhase("measuring")
    setTimeout(() => {
      setPhase("done")
      setTimeout(onComplete, 800)
    }, 10000)
  }

  return (
    <div
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
      style={{
        position: "fixed", inset: 0, background: "rgba(26,25,21,.5)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
      }}
    >
      <div
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 20, padding: "36px 40px",
          width: 320, textAlign: "center",
          boxShadow: "0 8px 40px rgba(0,0,0,.12)",
          border: "1.5px solid #E5E0D8",
        }}
      >
        {phase === "ready" && (
          <>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: "#1A1915" }}>匂いを測定する</div>
            <div style={{ fontSize: 13, color: "#8C7B6B", marginBottom: 28, lineHeight: 1.6 }}>
              現在地の匂いをセンサーで計測します
            </div>
            <button
              onClick={start}
              style={{
                width: "100%", padding: "12px 0", background: "#D97757",
                border: "none", borderRadius: 12, color: "white",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                boxShadow: "0 2px 8px rgba(217,119,87,.35)",
              }}
            >
              測定開始
            </button>
          </>
        )}
        {phase === "measuring" && (
          <>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 2, width: 62, height: 62 }}>
                {DOTS.map((dot, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: DOT_VARIANTS[dot.v].c1,
                      animationName: `dp${dot.v}`,
                      animationDuration: dot.dur,
                      animationDelay: dot.del,
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ fontSize: 15, color: "#6B6459" }}>測定中...</div>
            <style>{`
              ${DOT_VARIANTS.map((v, i) => `
                @keyframes dp${i} {
                  0%   { transform: scale(0.3); background: ${v.c1}; opacity: 0.5; }
                  50%  { transform: scale(1.0); background: ${v.c2}; opacity: 1.0; }
                  100% { transform: scale(0.3); background: ${v.c1}; opacity: 0.5; }
                }
              `).join("")}
            `}</style>
          </>
        )}
        {phase === "done" && (
          <>
            <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 15, color: "#D97757", fontWeight: 600 }}>測定完了</div>
          </>
        )}
      </div>
    </div>
  )
}
