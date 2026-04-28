import { aiInsights } from "@/lib/mockData";
import { Sparkles } from "lucide-react";

export default function AIInsightsPanel() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            AI Insights
          </h3>
        </div>
        <span className="text-xs text-slate-500">Updated 2h ago</span>
      </div>
      <div className="space-y-4">
        {aiInsights.map((insight, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur rounded-lg p-4 border border-white"
          >
            <div className="flex gap-3">
              <span className="text-xl flex-shrink-0">{insight.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">
                  {insight.title}
                </div>
                <div className="text-sm text-slate-800 mb-1">
                  {insight.body}
                </div>
                {insight.meta && (
                  <div className="text-xs text-slate-500">{insight.meta}</div>
                )}
                <div className="flex gap-2 mt-2">
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    Why? ▾
                  </button>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    View entries →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
