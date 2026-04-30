import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

function SentimentChart({ data }) {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      {/* ✅ THESE MUST BE INSIDE */}
      <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
      <Legend wrapperStyle={{ color: "#e2e8f0" }} />

    </PieChart>
  );
}

export default SentimentChart;