function InsightCard({ title, value }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#f5f5f5",
        minWidth: "150px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default InsightCard;