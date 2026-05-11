"use client"

import { useState } from "react"

export function MeasureModal({ onComplete, onClose }: { onComplete: () => void; onClose: () => void }) {
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
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
      style={{
        position: "fixed", inset: 0, background: "rgba(26,25,21,.5)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
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
            <div style={{ fontSize: 44, marginBottom: 16, animation: "spin 1s linear infinite" }}>🌀</div>
            <div style={{ fontSize: 15, color: "#6B6459" }}>測定中...</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
