export function IntensityBar({ value }: { value: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i <= value ? "#D97757" : "#E5E0D8",
          }}
        />
      ))}
      <span style={{ color: "#8C7B6B", fontSize: 11, marginLeft: 4 }}>{value}/5</span>
    </span>
  )
}
