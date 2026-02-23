import SEO from "../../components/ui/SEO";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { VISITORS_DATA, PROVIDERS_DISTRIBUTION } from "../../constants/adminMetrics";
import { PROVIDERS } from "../../constants/providers";
import { REVIEWS } from "../../constants/reviews";
import { BLOG_POSTS } from "../../constants/blogPosts";

export default function AdminDashboardPage() {
    // Dynamic Stats
    const stats = [
        { label: "Aktif Sağlayıcı", value: PROVIDERS.length.toString(), icon: "storefront", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Toplam Yorum", value: REVIEWS.length.toString(), icon: "reviews", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
        { label: "Yayındaki Blog", value: BLOG_POSTS.length.toString(), icon: "article", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "Aylık Ziyaretçi", value: "12.4K", icon: "trending_up", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    ];

    return (
        <div className="space-y-6">
            <SEO title="Dashboard" path="/admin" description="POSBul Yönetici Dashboard" />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
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

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Line Chart */}
                <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Ziyaretçi ve Başvuru Trendi (Son 30 Gün)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={VISITORS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                                <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#E2E8F0' }}
                                />
                                <Line type="monotone" dataKey="visitors" name="Ziyaretçi" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="applicants" name="Başvuran" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Sağlayıcı Dağılımı</h2>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={PROVIDERS_DISTRIBUTION}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {PROVIDERS_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#E2E8F0' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Hızlı Etkileşimler</h2>
                <div className="flex gap-4">
                    <Link to="/admin/providers" className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Yeni Sağlayıcı Ekle
                    </Link>
                    <Link to="/admin/blog" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-[18px]">edit_document</span>
                        Blog Yazısı Oluştur
                    </Link>
                </div>
            </div>
        </div>
    );
}
