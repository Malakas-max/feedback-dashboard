"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  RefreshCw,
} from "lucide-react";

interface Feedback {
  id: number;
  member_id: string;
  member_name: string;
  member_email: string;
  category: string;
  subject: string;
  rating: number;
  comment: string;
  status: string;
  submitted_at: string;
}

const categoryColors: Record<string, string> = {
  website: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
  lectures: "bg-emerald-100 text-emerald-700",
  handouts: "bg-amber-100 text-amber-700",
  support: "bg-pink-100 text-pink-700",
};

export default function AdminPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");

  async function fetchFeedback() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/feedback");
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to load feedback");
      } else {
        setFeedback(data.feedback || []);
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Calculate real stats
  const total = feedback.length;
  const avgRating =
    total > 0
      ? (feedback.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
      : "—";
  const uniqueMembers = new Set(feedback.map((f) => f.member_id)).size;
  const promoters = feedback.filter((f) => f.rating >= 4).length;
  const promoterPct =
    total > 0 ? Math.round((promoters / total) * 100) : 0;

  // Category breakdown
  const categoryCounts = feedback.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  // Filtered list
  const filtered =
    filter === "all" ? feedback : feedback.filter((f) => f.category === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Real-time feedback from your members
            </p>
          </div>
          <button
            onClick={fetchFeedback}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<MessageSquare className="w-5 h-5 text-blue-600" />}
            label="Total Feedback"
            value={total.toString()}
          />
          <StatCard
            icon={<Star className="w-5 h-5 text-amber-500" />}
            label="Average Rating"
            value={avgRating}
            suffix={total > 0 ? "/5" : ""}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            label="Positive (4-5★)"
            value={`${promoterPct}%`}
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-purple-600" />}
            label="Unique Members"
            value={uniqueMembers.toString()}
          />
        </div>

        {/* Category filter */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-3">
            Filter by category
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label={`All (${total})`}
            />
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <FilterButton
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
                label={`${cat} (${count})`}
              />
            ))}
          </div>
        </div>

        {/* Feedback list */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Submissions{" "}
              <span className="text-slate-400 font-normal">
                ({filtered.length})
              </span>
            </h2>
          </div>

          {loading && (
            <div className="p-8 text-center text-sm text-slate-500">
              Loading feedback...
            </div>
          )}

          {error && (
            <div className="p-8 text-center text-sm text-red-600">{error}</div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500">
              No feedback yet. Try submitting a test at{" "}
              <a href="/feedback" className="text-blue-600 underline">
                /feedback
              </a>
              .
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="divide-y divide-slate-100">
              {filtered.map((f) => (
                <div key={f.id} className="p-5 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${
                          categoryColors[f.category] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {f.category}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {f.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`w-4 h-4 ${
                            n <= f.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-3 whitespace-pre-wrap">
                    {f.comment}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="font-medium text-slate-700">
                      {f.member_name}
                    </span>
                    <span>·</span>
                    <span>{f.member_email}</span>
                    <span>·</span>
                    <span>
                      {new Date(f.submitted_at).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded uppercase tracking-wider text-[10px] font-semibold">
                      {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 py-4">
          Showing the latest 100 submissions · Connected to Neon Postgres
        </p>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-slate-900">{value}</span>
        {suffix && <span className="text-sm text-slate-400">{suffix}</span>}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-md font-medium capitalize transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}
