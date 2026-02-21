import type { Review } from "../../types/review.types";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {review.userName.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {review.userName}
                    </span>
                </div>
                <span className="text-xs text-slate-400">
                    {new Date(review.date).toLocaleDateString("tr-TR")}
                </span>
            </div>

            {/* Stars */}
            <div className="mb-2 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                    <span
                        key={s}
                        className={`material-symbols-outlined filled text-[16px] ${s <= review.rating ? "text-amber-400" : "text-slate-300 dark:text-slate-600"
                            }`}
                    >
                        star
                    </span>
                ))}
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {review.comment}
            </p>
        </div>
    );
}
