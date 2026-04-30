export function IntensityBar({ value }: { value: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i <= value ? "#4285f4" : "#dfe1e5",
          }}
        />
      ))}
      <span style={{ color: "#555", fontSize: 11, marginLeft: 4 }}>{value}/5</span>
    </span>
  )
}
