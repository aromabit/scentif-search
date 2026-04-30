"use client"

import Image from "next/image"
import { Measurement } from "@/data/measurements"
import { IntensityBar } from "./IntensityBar"

export function ResultCard({
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #e8e8e8",
        cursor: "pointer",
        background: selected ? "#e8f0fe" : "white",
        borderLeft: selected ? "3px solid #1a73e8" : "3px solid transparent",
        transition: "background 0.15s",
      }}
    >
      {measurement.imageUrl && (
        <div style={{ position: "relative", width: "100%", height: 160, marginBottom: 10, borderRadius: 8, overflow: "hidden" }}>
          <Image
            src={measurement.imageUrl}
            alt={measurement.locationName}
            fill
            style={{ objectFit: "cover" }}
            sizes="380px"
          />
        </div>
      )}
      <div style={{ fontWeight: 600, fontSize: 15, color: "#1a0dab", marginBottom: 2 }}>
        {measurement.locationName}
      </div>
      <div style={{ fontSize: 12, color: "#70757a", marginBottom: 6 }}>{measurement.address}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#444" }}>📅 {dateStr} {timeStr}</span>
        <span style={{ fontSize: 12, color: "#444" }}>🌡 {measurement.temperature}°C</span>
        <span style={{ fontSize: 12, color: "#444" }}>💧 湿度{measurement.humidity}%</span>
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
