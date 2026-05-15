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
  const dateStr = dt.toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" })
  const timeStr = dt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
      style={{
        margin: "10px 12px",
        borderRadius: 14,
        cursor: "pointer",
        background: "white",
        border: selected ? "1.5px solid #D97757" : "1.5px solid #EDE9E3",
        boxShadow: selected
          ? "0 4px 18px rgba(217,119,87,.18)"
          : "0 1px 6px rgba(0,0,0,.06)",
        transition: "box-shadow 0.15s, border-color 0.15s",
        overflow: "hidden",
      }}
    >
      {measurement.imageUrl && (
        <div style={{ position: "relative", width: "100%", height: 148 }}>
          <Image
            src={measurement.imageUrl}
            alt={measurement.locationName}
            fill
            style={{ objectFit: "cover" }}
            sizes="380px"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(20,15,10,.45) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 14,
              right: 14,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "white", lineHeight: 1.3 }}>
                {measurement.locationName}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", marginTop: 1 }}>
                {measurement.address}
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                background: "rgba(255,255,255,.18)",
                backdropFilter: "blur(6px)",
                color: "white",
                padding: "3px 9px",
                borderRadius: 20,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,.25)",
                flexShrink: 0,
                marginLeft: 8,
              }}
            >
              {measurement.scentType}
            </span>
          </div>
        </div>
      )}

      <div style={{ padding: "12px 14px" }}>
        {!measurement.imageUrl && (
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1A1915" }}>
                {measurement.locationName}
              </div>
              <span
                style={{
                  fontSize: 10,
                  background: "#FFF0E8",
                  color: "#A0522D",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontWeight: 600,
                  flexShrink: 0,
                  marginLeft: 8,
                }}
              >
                {measurement.scentType}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#8C7B6B" }}>{measurement.address}</div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <IntensityBar value={measurement.intensity} />
          <span style={{ fontSize: 11, color: "#A09080" }}>
            {dateStr} {timeStr}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
            marginBottom: 10,
          }}
        >
          {[
            { icon: "🌡", value: `${measurement.temperature}°C` },
            { icon: "💧", value: `${measurement.humidity}%` },
            { icon: "☀️", value: `${(measurement.illuminance / 1000).toFixed(1)}k` },
            { icon: "💨", value: `${measurement.windSpeed}m/s` },
            { icon: "🔊", value: `${measurement.soundLevel}dB` },
          ].map(({ icon, value }) => (
            <div
              key={icon}
              style={{
                background: "#FAF8F5",
                borderRadius: 8,
                padding: "5px 2px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 13 }}>{icon}</div>
              <div style={{ fontSize: 10, color: "#6B6459", fontWeight: 500, marginTop: 1 }}>{value}</div>
            </div>
          ))}
        </div>

        {measurement.notes && (
          <div
            style={{
              fontSize: 12,
              color: "#6B6459",
              lineHeight: 1.65,
              borderTop: "1px solid #F0EDE8",
              paddingTop: 8,
            }}
          >
            {measurement.notes}
          </div>
        )}
      </div>
    </div>
  )
}
