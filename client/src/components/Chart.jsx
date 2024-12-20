import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <BarChart width={140} height={40} data={data}>
        <XAxis dataKey={"name"} />
        <YAxis dataKey={"total"} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#ffa366" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
