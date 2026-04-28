"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { npsTrend } from "@/lib/mockData";

export default function NPSTrendChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          NPS Trend — 12 weeks
        </h3>
        <span className="text-xs text-slate-500">Improving ▲</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={npsTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="current"
            stroke="#2563eb"
            strokeWidth={2.5}
            name="This year"
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="previous"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="4 4"
            name="Last year"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
