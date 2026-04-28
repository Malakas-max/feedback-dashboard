"use client";

import { useState } from "react";
import { Globe, Settings, GraduationCap, FileText, Headphones, Star, Send, CheckCircle2, User } from "lucide-react";

const categories = [
  { id: "website", label: "Website", icon: Globe, description: "Site experience, navigation, bugs" },
  { id: "admin", label: "Admin", icon: Settings, description: "Operations, communications, processes" },
  { id: "lectures", label: "Lectures", icon: GraduationCap, description: "Content, delivery, pacing" },
  { id: "handouts", label: "Handouts", icon: FileText, description: "Materials, clarity, usefulness" },
  { id: "support", label: "Support", icon: Headphones, description: "Help received, response time" },
];

// In production this comes from MemberPress / your auth system.
// For Vercel testing, we hard-code a demo member.
const currentMember = {
  id: "demo-001",
  name: "Test Member",
  email: "test@example.com",
};

export default function FeedbackPage() {
  const [category, setCategory] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!category) return setError("Please choose a category.");
    if (!subject.trim()) return setError("Please add a subject.");
    if (!rating) return setError("Please give a rating.");
    if (!comment.trim()) return setError("Please add your feedback.");

    setSubmitting(true);

    // Build the submission payload — this structure is ready for the database in Part 7.
    const payload = {
      memberId: currentMember.id,
      memberName: currentMember.name,
      memberEmail: currentMember.email,
      category,
      subject,
      rating,
      comment,
      submittedAt: new Date().toISOString(),
    };

    console.log("Submission payload (will save to DB in Part 7):", payload);

    // Simulate a save
    await new Promise((r) => setTimeout(r, 800));

    setSubmitting(false);
    setSubmitted(true);
  }

  function resetForm() {
    setCategory("");
    setSubject("");
    setRating(0);
    setComment("");
    setSubmitted(false);
    setError("");
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Thank you, {currentMember.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-600 mb-6">
            Your feedback has been received. We read every submission and use it to improve.
          </p>
          <button
            onClick={resetForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Share your feedback
          </h1>
          <p className="text-slate-600">
            Help us improve your experience. It takes less than 60 seconds.
          </p>
        </div>

        {/* Logged-in banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-sm text-blue-900">
            Submitting as <span className="font-semibold">{currentMember.name}</span>
          </span>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6"
        >
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              What is this about? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {categories.map((c) => {
                const Icon = c.icon;
                const selected = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        selected ? "text-blue-600" : "text-slate-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        selected ? "text-blue-700" : "text-slate-700"
                      }`}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {category && (
              <p className="text-xs text-slate-500 mt-2">
                {categories.find((c) => c.id === category)?.description}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-slate-900 mb-2"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
              placeholder="e.g. Module 3 lecture pacing, or Login button on mobile"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="text-xs text-slate-400 mt-1 text-right">
              {subject.length}/120
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              How would you rate this? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = (hoverRating || rating) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-9 h-9 transition-colors ${
                        filled
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="ml-3 self-center text-sm text-slate-600">
                  {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-slate-900 mb-2"
            >
              Your feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              maxLength={2000}
              placeholder="Tell us what's working, what isn't, and anything specific that would help..."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
            <div className="text-xs text-slate-400 mt-1 text-right">
              {comment.length}/2000
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>Submitting...</>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit feedback
              </>
            )}
          </button>

          <p className="text-xs text-center text-slate-400">
            Your feedback is reviewed by the team. We typically respond within 5 working days.
          </p>
        </form>
      </div>
    </div>
  );
}
