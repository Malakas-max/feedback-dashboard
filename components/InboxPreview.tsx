import { inboxItems } from "@/lib/mockData";

const severityColors: Record<string, string> = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  success: "bg-emerald-500",
};

const typeColors: Record<string, string> = {
  Bug: "bg-red-50 text-red-700 border-red-200",
  Feature: "bg-blue-50 text-blue-700 border-blue-200",
  Praise: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function InboxPreview() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900">Inbox Preview</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">18 unread</span>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </button>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {inboxItems.map((item, i) => (
          <div
            key={i}
            className="p-4 hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  severityColors[item.severity]
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-xs px-2 py-0.5 rounded border font-medium ${
                      typeColors[item.type]
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    {item.title}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mb-2">
                  {item.votes > 0 && <span>▸ {item.votes} votes · </span>}
                  <span>{item.tier}</span>
                  {item.arr && <span> · {item.arr}</span>}
                  <span> · {item.source}</span>
                  <span> · {item.age}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex gap-1.5 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs px-2 py-1 border border-slate-200 rounded hover:bg-white">
                      Assign ▾
                    </button>
                    <button className="text-xs px-2 py-1 border border-slate-200 rounded hover:bg-white">
                      Status ▾
                    </button>
                    <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
