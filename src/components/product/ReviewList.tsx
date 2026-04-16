"use client";

import { useState } from "react";
import { Star, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import type { Review } from "@/types/product";

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={
            n <= value
              ? "fill-amber-400 text-amber-400"
              : "fill-kyuto-purple-100 text-kyuto-purple-100"
          }
        />
      ))}
    </div>
  );
}

export function ReviewList({ reviews }: { reviews?: Review[] }) {
  const [openForm, setOpenForm] = useState(false);

  const hasReviews = !!reviews && reviews.length > 0;
  const average = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="pt-8 border-t border-kyuto-purple-100">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="font-heading text-2xl text-kyuto-dark">
            Customer Reviews
          </h2>
          {hasReviews && (
            <div className="flex items-center gap-2 mt-1">
              <Stars value={Math.round(average)} />
              <span className="text-sm text-kyuto-grey">
                {average.toFixed(1)} · {reviews!.length} review
                {reviews!.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-1.5"
        >
          <Plus size={14} /> Add Review
        </Button>
      </div>

      {!hasReviews ? (
        <div className="py-10 text-center">
          <p className="font-hand text-xl text-kyuto-purple-600">
            No reviews yet
          </p>
          <p className="mt-1 text-sm text-kyuto-grey">
            Be the first to share your experience.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews!.map((r) => (
            <article
              key={r.id}
              className="p-5 rounded-2xl bg-white border border-kyuto-purple-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-kyuto-dark">{r.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Stars value={r.rating} />
                    {r.verified && (
                      <span className="text-xs text-emerald-700">
                        ✓ Verified buyer
                      </span>
                    )}
                  </div>
                </div>
                <time className="text-xs text-kyuto-grey">{r.date}</time>
              </div>
              {r.title && (
                <h3 className="font-heading text-lg text-kyuto-dark mt-2">
                  {r.title}
                </h3>
              )}
              <p className="mt-2 text-sm text-kyuto-grey leading-relaxed">
                {r.body}
              </p>
            </article>
          ))}
        </div>
      )}

      {openForm && (
        <AddReviewModal onClose={() => setOpenForm(false)} />
      )}
    </div>
  );
}

function AddReviewModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      toast.error("Please fill your name and review");
      return;
    }
    setSaving(true);
    // Submission flow isn't wired to the DB yet — surfacing the UX only.
    setTimeout(() => {
      setSaving(false);
      toast.success("Thanks for your review!", {
        description: "It will appear after moderation.",
      });
      onClose();
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-kyuto-dark/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-kyuto-purple-100 p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-kyuto-purple-50 text-kyuto-grey"
        >
          <X size={18} />
        </button>
        <h3 className="font-heading text-xl text-kyuto-dark">Write a review</h3>
        <p className="text-xs text-kyuto-grey mt-1">
          Share your experience with this product.
        </p>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="block text-xs font-medium text-kyuto-dark mb-1">
              Your name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
            />
          </label>

          <div>
            <span className="block text-xs font-medium text-kyuto-dark mb-1">
              Rating
            </span>
            <div className="inline-flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n === 1 ? "" : "s"}`}
                  className="p-0.5"
                >
                  <Star
                    size={24}
                    className={
                      n <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-kyuto-purple-100 text-kyuto-purple-200 hover:text-amber-400"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="block text-xs font-medium text-kyuto-dark mb-1">
              Title <span className="text-kyuto-grey font-normal">(optional)</span>
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-kyuto-dark mb-1">
              Review
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={saving}>
            {saving ? "Submitting..." : "Submit review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
