"use client";

import { useState } from "react";
import {
  Globe,
  Users,
  GraduationCap,
  FileText,
  HeadphonesIcon,
  Star,
  CheckCircle2,
  User,
} from "lucide-react";

const categories = [
  { id: "website", label: "Website", icon: Globe },
  { id: "admin", label: "Admin", icon: Users },
  { id: "lectures", label: "Lectures", icon: GraduationCap },
  { id: "handouts", label: "Handouts", icon: FileText },
  { id: "support", label: "Support", icon: HeadphonesIcon },
];

// Demo member — will be replaced with real WordPress login data later
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

    const payload = {
      memberId: currentMember.id,
      memberName: currentMember.name,
      memberEmail: currentMember.email,
      category,
      subject,
      rating,
      comment,
    };

    // Send to API (saves to Neon database)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      console.log("Feedback saved with ID:", data.id);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Could not connect to the server. Please try again.");
      setSubmitting(false);
      return;
    }
  }

  function resetForm() {
    setCategory("");
    setSubject("");
    setRating(0);
    setComment("");
    setSubmitted(false);
    setSubmitting(false);
    setError("");
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-md text-center shadow-sm">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Thank you, {currentMember.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-600 mb-6">
            Your feedback has been received. We read every submission and use
            it to improve.
          </p>
          <button
            onClick={resetForm}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
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
        <div className="mb-6 text-center">
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
                    className={`flex flex-col items-center gap-1 p-3 border rounded-lg text-xs font-medium transition ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
              placeholder="A short summary (e.g. 'Login button not working')"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="text-xs text-slate-400 mt-1 text-right">
              {subject.length}/120
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              How would you rate this? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = (hoverRating || rating) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 transition ${
                        active
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="ml-3 self-center text-sm text-slate-600">
                  {rating} of 5
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Your feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={2000}
              rows={5}
              placeholder="Tell us what worked, what didn't, or what you'd like to see..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="text-xs text-slate-400 mt-1 text-right">
              {comment.length}/2000
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit feedback"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Your feedback is reviewed by our team. We may follow up by email.
        </p>
      </div>
    </div>
  );
}
