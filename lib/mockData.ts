export const npsTrend = [
  { week: "W1", current: 28, previous: 22 },
  { week: "W2", current: 30, previous: 24 },
  { week: "W3", current: 32, previous: 25 },
  { week: "W4", current: 34, previous: 27 },
  { week: "W5", current: 35, previous: 28 },
  { week: "W6", current: 37, previous: 30 },
  { week: "W7", current: 38, previous: 31 },
  { week: "W8", current: 39, previous: 32 },
  { week: "W9", current: 40, previous: 33 },
  { week: "W10", current: 41, previous: 34 },
  { week: "W11", current: 42, previous: 35 },
  { week: "W12", current: 42, previous: 36 },
];

export const sentimentData = [
  { label: "Positive", value: 62, color: "#10B981" },
  { label: "Neutral", value: 24, color: "#94A3B8" },
  { label: "Negative", value: 14, color: "#EF4444" },
];

export const statusTiles = [
  {
    label: "NPS Score",
    value: "+42",
    delta: "+3 vs last month",
    deltaPositive: true,
    spark: [28, 30, 32, 34, 35, 37, 39, 42],
  },
  {
    label: "CSAT Avg",
    value: "4.3",
    suffix: "/5.0",
    delta: "+0.1 vs last month",
    deltaPositive: true,
    spark: [4.0, 4.1, 4.1, 4.2, 4.2, 4.2, 4.3, 4.3],
  },
  {
    label: "Response Rate",
    value: "34%",
    delta: "-2% vs last month",
    deltaPositive: false,
    spark: [36, 37, 36, 35, 36, 35, 34, 34],
  },
  {
    label: "Unread",
    value: "18",
    delta: "3 urgent · oldest 2d",
    deltaPositive: false,
    spark: [12, 14, 13, 15, 16, 17, 18, 18],
  },
  {
    label: "At-Risk Users",
    value: "7",
    delta: "+2 this week",
    deltaPositive: false,
    spark: [3, 4, 4, 5, 5, 6, 7, 7],
  },
];

export const aiInsights = [
  {
    type: "theme",
    icon: "🔍",
    title: "Top theme this week",
    body: '"Slow export on large datasets" · +47% mentions vs last week',
    meta: "Confidence: 89% · Based on 124 entries",
  },
  {
    type: "warning",
    icon: "⚠️",
    title: "Detractor cluster detected",
    body: "7 Enterprise customers rated 0–6 in the last 7 days. Theme: API rate limits.",
    meta: "Combined ARR: $284k",
  },
  {
    type: "action",
    icon: "✓",
    title: "Recommended actions",
    body: "Route 3 export items to Product · Send close-the-loop email to 12 users · Schedule call with 2 detractors",
    meta: "",
  },
];

export const inboxItems = [
  {
    severity: "critical",
    type: "Bug",
    title: "Export hangs on >10k rows",
    votes: 23,
    tier: "Enterprise",
    arr: "$48k ARR",
    source: "Web app",
    age: "2h ago",
    tags: ["Performance", "Export", "High-priority"],
  },
  {
    severity: "warning",
    type: "Feature",
    title: "Dark mode for reports",
    votes: 81,
    tier: "All tiers",
    arr: "",
    source: "Web + mobile",
    age: "5h ago",
    tags: ["UI Theme", "Accessibility"],
  },
  {
    severity: "success",
    type: "Praise",
    title: "Onboarding was great — got my team set up in 20 min",
    votes: 0,
    tier: "Pro",
    arr: "",
    source: "CSAT 5/5",
    age: "1d ago",
    tags: ["Onboarding", "Positive"],
  },
  {
    severity: "critical",
    type: "Bug",
    title: "API rate limit hits at 500 req/min — docs say 1000",
    votes: 4,
    tier: "Enterprise",
    arr: "$62k ARR",
    source: "API",
    age: "1d ago",
    tags: ["API", "Documentation", "Bug"],
  },
];
