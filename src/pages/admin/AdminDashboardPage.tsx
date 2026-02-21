import SEO from "../../components/ui/SEO";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <SEO title="Dashboard" path="/admin" description="POSBul Yönetici Dashboard" />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Aktif Sağlayıcı", value: "8", icon: "storefront", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                    { label: "Bekleyen Yorum", value: "12", icon: "reviews", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
                    { label: "Yayındaki Blog", value: "5", icon: "article", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                    { label: "Aylık Ziyaretçi", value: "12.4K", icon: "trending_up", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                                <span className={`material-symbols-outlined text-[24px] ${stat.color}`}>{stat.icon}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Hızlı Etkileşimler</h2>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Yeni Sağlayıcı Ekle
                    </button>
                    <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-[18px]">edit_document</span>
                        Blog Yazısı Oluştur
                    </button>
                </div>
            </div>
        </div>
    );
}
