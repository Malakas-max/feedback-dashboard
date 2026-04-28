import { sentimentData } from "@/lib/mockData";

export default function SentimentBreakdown() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Sentiment Breakdown
        </h3>
        <span className="text-xs text-slate-500">Last 30 days</span>
      </div>
      <div className="space-y-4">
        {sentimentData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-900">
                {item.value}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.value}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-xs text-blue-600 hover:text-blue-700 font-medium">
        View detailed breakdown →
      </button>
    </div>
  );
}
