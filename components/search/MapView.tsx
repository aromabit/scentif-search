"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { Measurement } from "@/data/measurements"

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const selectedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "selected-marker",
})

function MapPanner({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

type Props = {
  measurements: Measurement[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function MapView({ measurements, selectedId, onSelect }: Props) {
  const center: [number, number] =
    measurements.length > 0
      ? [
          measurements.reduce((s, m) => s + m.lat, 0) / measurements.length,
          measurements.reduce((s, m) => s + m.lng, 0) / measurements.length,
        ]
      : [35.6762, 139.6503]

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapPanner center={center} />
      {measurements.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={m.id === selectedId ? selectedIcon : icon}
          eventHandlers={{ click: () => onSelect(m.id) }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong style={{ fontSize: 14 }}>{m.locationName}</strong>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                {new Date(m.measuredAt).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" })}
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {m.scentType} / {m.temperature}°C / 湿度{m.humidity}%
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
