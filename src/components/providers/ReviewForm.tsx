import { useState, useCallback } from "react";
import Button from "../ui/Button";

interface ReviewFormProps {
    onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (rating === 0 || !comment.trim()) return;
            onSubmit(rating, comment);
            setSubmitted(true);
        },
        [rating, comment, onSubmit]
    );

    if (submitted) {
        return (
            <div className="rounded-xl bg-emerald-50 p-4 text-center dark:bg-emerald-900/20">
                <span className="material-symbols-outlined filled mb-1 text-[24px] text-emerald-500">
                    check_circle
                </span>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Yorumunuz gönderildi! Teşekkürler.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {/* Star selection */}
            <div>
                <p className="mb-1.5 text-xs font-medium text-slate-500">Puanınız</p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => setRating(s)}
                            onMouseEnter={() => setHoveredStar(s)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="cursor-pointer p-0.5"
                            aria-label={`${s} yıldız`}
                        >
                            <span
                                className={`material-symbols-outlined filled text-[24px] transition-colors ${s <= (hoveredStar || rating)
                                        ? "text-amber-400"
                                        : "text-slate-300 dark:text-slate-600"
                                    }`}
                            >
                                star
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Comment */}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deneyiminizi paylaşın..."
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                aria-label="Yorumunuz"
            />

            <Button
                type="submit"
                variant="primary"
                size="sm"
                icon="send"
                disabled={rating === 0 || !comment.trim()}
                className="w-full justify-center"
            >
                Yorum Gönder
            </Button>
        </form>
    );
}
