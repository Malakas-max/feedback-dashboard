import { TrendingUp, TrendingDown } from "lucide-react";

interface StatusTileProps {
  label: string;
  value: string;
  suffix?: string;
  delta: string;
  deltaPositive: boolean;
  spark: number[];
}

export default function StatusTile({
  label,
  value,
  suffix,
  delta,
  deltaPositive,
  spark,
}: StatusTileProps) {
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const range = max - min || 1;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">
        {label}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-semibold text-slate-900">{value}</span>
        {suffix && <span className="text-lg text-slate-400">{suffix}</span>}
      </div>
      <div
        className={`flex items-center gap-1 text-xs font-medium mb-3 ${
          deltaPositive ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {deltaPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <span>{delta}</span>
      </div>
      <div className="flex items-end gap-0.5 h-8">
        {spark.map((v, i) => {
          const height = ((v - min) / range) * 100;
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm ${
                deltaPositive ? "bg-emerald-200" : "bg-red-200"
              }`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
