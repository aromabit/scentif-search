export function IntensityBar({ value }: { value: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: i <= value ? 16 : 10,
            height: 6,
            borderRadius: 3,
            background: i <= value
              ? `hsl(${20 + (i - 1) * 6}, 68%, ${62 - (i - 1) * 4}%)`
              : "#E5E0D8",
            transition: "width 0.2s",
          }}
        />
      ))}
      <span style={{ color: "#A09080", fontSize: 11, marginLeft: 2, fontWeight: 600 }}>
        {value}<span style={{ fontWeight: 400, color: "#C0B4A8" }}>/5</span>
      </span>
    </span>
  )
}
