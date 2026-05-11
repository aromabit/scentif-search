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
        padding: "14px 16px",
        borderBottom: "1px solid #F0EDE8",
        cursor: "pointer",
        background: selected ? "#FDF5F1" : "white",
        borderLeft: selected ? "3px solid #D97757" : "3px solid transparent",
        transition: "background 0.15s",
      }}
    >
      {measurement.imageUrl && (
        <div style={{ position: "relative", width: "100%", height: 160, marginBottom: 12, borderRadius: 10, overflow: "hidden" }}>
          <Image
            src={measurement.imageUrl}
            alt={measurement.locationName}
            fill
            style={{ objectFit: "cover" }}
            sizes="380px"
          />
        </div>
      )}
      <div style={{ fontWeight: 600, fontSize: 15, color: "#1A1915", marginBottom: 2 }}>
        {measurement.locationName}
      </div>
      <div style={{ fontSize: 12, color: "#8C7B6B", marginBottom: 8 }}>{measurement.address}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "#6B6459" }}>📅 {dateStr} {timeStr}</span>
        <span style={{ fontSize: 12, color: "#6B6459" }}>📍 {measurement.lat.toFixed(4)}, {measurement.lng.toFixed(4)}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "#6B6459" }}>🌡 {measurement.temperature}°C</span>
        <span style={{ fontSize: 12, color: "#6B6459" }}>💧 {measurement.humidity}%</span>
        <span style={{ fontSize: 12, color: "#6B6459" }}>☀️ {measurement.illuminance.toLocaleString()}lx</span>
        <span style={{ fontSize: 12, color: "#6B6459" }}>💨 {measurement.windSpeed}m/s</span>
        <span style={{ fontSize: 12, color: "#6B6459" }}>🔊 {measurement.soundLevel}dB</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            background: "#FFF0E8",
            color: "#A0522D",
            padding: "3px 10px",
            borderRadius: 12,
            fontWeight: 500,
          }}
        >
          {measurement.scentType}
        </span>
        <IntensityBar value={measurement.intensity} />
      </div>

      <div style={{ fontSize: 13, color: "#6B6459", lineHeight: 1.6 }}>{measurement.notes}</div>
    </div>
  )
}
