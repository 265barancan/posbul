import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { MOCK_LEADS } from "../../constants/mockLeads";
import type { Lead, LeadStatus } from "../../types/lead.types";

export default function MerchantLeadsPage() {
    const { user } = useAuthStore();
    const providerId = user?.providerId;

    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS.filter(l => l.providerId === providerId));

    const handleStatusChange = (id: string, newStatus: LeadStatus) => {
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    };

    const getStatusStyle = (status: LeadStatus) => {
        switch (status) {
            case "YENI":
                return "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";
            case "INCELEMEDE":
                return "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20";
            case "ONAYLANDI":
                return "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
            case "REDDEDILDI":
                return "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20";
            default:
                return "bg-slate-100 text-slate-800";
        }
    };

    if (!providerId) return <div>Yetkisiz Erişim</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gelen Başvurular (Leads)</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Platform üzerinden firmanızı tercih eden ve teklif bekleyen kullanıcıların listesi.
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4">Firma Adı (Yetkili)</th>
                                <th className="px-6 py-4">İletişim</th>
                                <th className="px-6 py-4">Aylık Ciro</th>
                                <th className="px-6 py-4">Durum</th>
                                <th className="px-6 py-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                    <td className="whitespace-nowrap px-6 py-4 text-slate-600 dark:text-slate-400">
                                        {new Date(lead.createdAt).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900 dark:text-white">{lead.companyName}</div>
                                        <div className="text-xs text-slate-500">{lead.contactName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-900 dark:text-white">{lead.phone}</div>
                                        <div className="text-xs text-slate-500">{lead.email}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900 dark:text-white">
                                        {lead.volume}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                                        >
                                            <option value="YENI">Yeni</option>
                                            <option value="INCELEMEDE">İncelemede</option>
                                            <option value="ONAYLANDI">Onaylandı</option>
                                            <option value="REDDEDILDI">Reddedildi</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        Henüz bir başvuru bulunmuyor.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
