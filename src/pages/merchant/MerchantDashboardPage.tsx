import { useMemo } from "react";
import { useAuthStore } from "../../store/authStore";
import { MOCK_LEADS } from "../../constants/mockLeads";

export default function MerchantDashboardPage() {
    const { user } = useAuthStore();
    const providerId = user?.providerId;

    const stats = useMemo(() => {
        if (!providerId) return { total: 0, new: 0, approved: 0 };
        const myLeads = MOCK_LEADS.filter(l => l.providerId === providerId);
        return {
            total: myLeads.length,
            new: myLeads.filter(l => l.status === "YENI").length,
            approved: myLeads.filter(l => l.status === "ONAYLANDI").length,
        };
    }, [providerId]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Hoş Geldiniz, {user?.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                Buradan firmanıza gelen taze başvuruları ve genel durumunuzu takip edebilirsiniz.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Toplam Başvuru</h3>
                        <span className="material-symbols-outlined text-primary">groups</span>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total}</p>
                    <p className="mt-2 text-sm text-slate-500">POSBul yönlendirmeleri</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Yeni Başvurular</h3>
                        <span className="material-symbols-outlined text-amber-500">fiber_new</span>
                    </div>
                    <p className="text-3xl font-extrabold text-amber-500">{stats.new}</p>
                    <p className="mt-2 text-sm text-slate-500">İşlem bekleyen</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Onaylananlar</h3>
                        <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                    </div>
                    <p className="text-3xl font-extrabold text-emerald-500">{stats.approved}</p>
                    <p className="mt-2 text-sm text-slate-500">Başarılı satıcı</p>
                </div>
            </div>
        </div>
    );
}
