import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../components/ui/SEO";
import { PROVIDERS } from "../../constants/providers";

export default function AdminProvidersPage() {
    const [search, setSearch] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // In a real application, 'providers' would be state managed by Firebase
    const filteredProviders = PROVIDERS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save logic
        alert("Sağlayıcı başarıyla kaydedildi! (Demo Modu)");
        setIsDrawerOpen(false);
    };

    return (
        <div className="space-y-6">
            <SEO title="Sağlayıcı Yönetimi" path="/admin/providers" description="POSBul Sağlayıcı Yönetimi" />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sağlayıcı Yönetimi</h1>
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Yeni Ekle
                </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {/* Toolbar */}
                <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                    <div className="relative max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Sağlayıcı ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white focus:dark:bg-slate-800"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 dark:bg-slate-800/30">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Sağlayıcı</th>
                                <th className="px-6 py-4 font-semibold">Segment</th>
                                <th className="px-6 py-4 font-semibold">Komisyon (Min)</th>
                                <th className="px-6 py-4 font-semibold">Ödeme Süresi</th>
                                <th className="px-6 py-4 text-right font-semibold">Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredProviders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">
                                        Eşleşen sağlayıcı bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredProviders.map((provider) => (
                                    <tr key={provider.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700">
                                                    <img src={provider.logo} alt={provider.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <span className="font-medium text-slate-900 dark:text-white">{provider.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize">
                                                {provider.segment}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            %{provider.commissionRate.min}
                                        </td>
                                        <td className="px-6 py-4">
                                            {provider.paymentSpeedHours} Saat
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setIsDrawerOpen(true)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400">
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

            {/* Provider Form Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl dark:bg-slate-900"
                        >
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sağlayıcı Ekle/Düzenle</h2>
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">close</span>
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                                    <form id="provider-form" onSubmit={handleSave} className="space-y-5">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Marka Adı
                                            </label>
                                            <input type="text" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="Örn: PayTR" />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Alt Başlık
                                            </label>
                                            <input type="text" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="Örn: Yüksek Dönüşüm Oranlı" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Min Komisyon (%)
                                                </label>
                                                <input type="number" step="0.01" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="0.99" />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Max Komisyon (%)
                                                </label>
                                                <input type="number" step="0.01" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="1.49" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Ödeme Süresi (Saat)
                                                </label>
                                                <input type="number" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" placeholder="24" />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Segment
                                                </label>
                                                <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                                                    <option value="kurumsal">Kurumsal</option>
                                                    <option value="bireysel">Bireysel</option>
                                                    <option value="her ikisi">Her İkisi</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="border-t border-slate-200 p-6 dark:border-slate-800">
                                    <button
                                        type="submit"
                                        form="provider-form"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">save</span>
                                        Değişiklikleri Kaydet
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
