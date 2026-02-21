import { useState } from "react";
import SEO from "../../components/ui/SEO";
import { REVIEWS } from "../../constants/reviews";

export default function AdminReviewsPage() {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved">("all");

    // In a real app we'd fetch this from Firebase, and it would have an 'isApproved' field.
    // For now we mock the state: let's pretend some are pending.
    const [reviews, setReviews] = useState(
        REVIEWS.map((r, i) => ({ ...r, isApproved: i % 3 !== 0 })) // 1 out of 3 is pending
    );

    const filteredReviews = reviews.filter((r) => {
        const matchesSearch = r.userName.toLowerCase().includes(search.toLowerCase()) ||
            r.comment.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === "all" ? true :
            filterStatus === "approved" ? r.isApproved : !r.isApproved;
        return matchesSearch && matchesStatus;
    });

    const toggleApproval = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: !r.isApproved } : r));
    };

    const deleteReview = (id: string) => {
        if (confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <SEO title="Yorum Yönetimi" path="/admin/reviews" description="POSBul Yorum Moderasyonu" />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yorum Yönetimi</h1>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {/* Toolbar */}
                <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Yazar veya yorum içeriği ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white focus:dark:bg-slate-800"
                        />
                    </div>

                    <div className="flex gap-2">
                        {(["all", "pending", "approved"] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${filterStatus === status
                                    ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {status === "all" ? "Tümü" : status === "pending" ? "Bekleyen" : "Onaylı"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 dark:bg-slate-800/30">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Yazar / Firma</th>
                                <th className="px-6 py-4 font-semibold">Sağlayıcı</th>
                                <th className="px-6 py-4 font-semibold">Puan</th>
                                <th className="w-1/3 px-6 py-4 font-semibold">Yorum</th>
                                <th className="px-6 py-4 font-semibold">Durum</th>
                                <th className="px-6 py-4 text-right font-semibold">Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredReviews.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-slate-500">
                                        Eşleşen yorum bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredReviews.map((review) => (
                                    <tr key={review.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {review.userName}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {review.providerId}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <span className="material-symbols-outlined filled text-[16px]">star</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">{review.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="line-clamp-2 text-xs leading-relaxed" title={review.comment}>
                                                {review.comment}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {review.isApproved ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                    Yayında
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500"></span>
                                                    Bekliyor
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleApproval(review.id)}
                                                    title={review.isApproved ? "Yayından Kaldır" : "Onayla"}
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${review.isApproved
                                                        ? "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                                        : "text-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        {review.isApproved ? "visibility_off" : "check_circle"}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => deleteReview(review.id)}
                                                    title="Sil"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
