"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import { Measurement } from "@/data/measurements"

const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
}

type Props = {
  measurements: Measurement[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function MapView({ measurements, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map())
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  })

  useEffect(() => {
    if (!containerRef.current) return
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OSM_STYLE,
      center: [139.6503, 35.6762],
      zoom: 13,
    })
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((m) => m.remove())
    markersRef.current.clear()

    measurements.forEach((m) => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<div style="min-width:160px">
          <strong style="font-size:14px">${m.locationName}</strong>
          <div style="font-size:12px;color:#666;margin-top:4px">${new Date(m.measuredAt).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" })}</div>
          <div style="font-size:12px;margin-top:4px">${m.scentType} / ${m.temperature}°C / 湿度${m.humidity}%</div>
        </div>`
      )

      const marker = new maplibregl.Marker({ color: m.id === selectedId ? "#e74c3c" : "#3fb1ce" })
        .setLngLat([m.lng, m.lat])
        .setPopup(popup)
        .addTo(map)

      marker.getElement().addEventListener("click", () => onSelectRef.current(m.id))
      markersRef.current.set(m.id, marker)
    })

    if (measurements.length > 0) {
      const avgLng = measurements.reduce((s, m) => s + m.lng, 0) / measurements.length
      const avgLat = measurements.reduce((s, m) => s + m.lat, 0) / measurements.length
      map.setCenter([avgLng, avgLat])
    }
  }, [measurements, selectedId])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedId) return
    const marker = markersRef.current.get(selectedId)
    if (!marker) return
    const { lng, lat } = marker.getLngLat()
    map.easeTo({ center: [lng, lat] })
    if (!marker.getPopup().isOpen()) marker.togglePopup()
  }, [selectedId])

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
}
