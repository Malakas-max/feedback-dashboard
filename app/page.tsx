import StatusTile from "@/components/StatusTile";
import NPSTrendChart from "@/components/NPSTrendChart";
import SentimentBreakdown from "@/components/SentimentBreakdown";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import InboxPreview from "@/components/InboxPreview";
import { statusTiles } from "@/lib/mockData";
import { Search, Plus, Bell } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-semibold text-slate-900">
                Acme Feedback
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {["Overview", "Inbox", "Boards", "Roadmap", "Insights"].map(
                (item, i) => (
                  <button
                    key={item}
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      i === 0
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md text-sm text-slate-500">
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-md">
              <Bell className="w-4 h-4 text-slate-600" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="text-xs px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
              📅 Last 30 days ▾
            </button>
            <button className="text-xs px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
              🏷 All segments ▾
            </button>
            <button className="text-xs px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
              📦 All products ▾
            </button>
          </div>
          <button className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-3 h-3" />
            New
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 mb-1">
            Good morning, Sarah 👋
          </h1>
          <p className="text-sm text-slate-500">
            Here&apos;s what needs your attention today.
          </p>
        </div>

        {/* Zone A: Status strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusTiles.map((tile) => (
            <StatusTile key={tile.label} {...tile} />
          ))}
        </div>

        {/* Zone B: Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NPSTrendChart />
          <SentimentBreakdown />
        </div>

        {/* Zone C: AI Insights */}
        <AIInsightsPanel />

        {/* Zone D: Inbox preview */}
        <InboxPreview />

        <footer className="text-center text-xs text-slate-400 py-8">
          Acme Feedback Dashboard · Built with Next.js & Tailwind · Deployed on Vercel
        </footer>
      </main>
    </div>
  );
}
