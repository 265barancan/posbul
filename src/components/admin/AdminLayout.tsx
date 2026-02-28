import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ADMIN_NAV = [
    { name: "Dashboard", path: "/admin", icon: "space_dashboard", end: true },
    { name: "Sağlayıcılar", path: "/admin/providers", icon: "storefront", end: false },
    { name: "Yorumlar", path: "/admin/reviews", icon: "reviews", end: false },
    { name: "Blog Yönetimi", path: "/admin/blog", icon: "article", end: false },
    { name: "Ayarlar", path: "/admin/settings", icon: "settings", end: false },
];

const MERCHANT_NAV = [
    { name: "Özet", path: "/admin", icon: "monitoring", end: true },
    { name: "Gelen Başvurular", path: "/admin/leads", icon: "format_list_bulleted", end: false },
];

export default function AdminLayout() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-8 flex items-center gap-2 px-2">
                    <span className="material-symbols-outlined text-[28px] text-primary">point_of_sale</span>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        POSBul <span className="text-primary font-normal">{user?.role === "MERCHANT" ? "Merchant" : "Admin"}</span>
                    </span>
                </div>

                <nav className="space-y-1">
                    {(user?.role === "MERCHANT" ? MERCHANT_NAV : ADMIN_NAV).map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                }`
                            }
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-4 right-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                            {user?.name.charAt(0) || "A"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-sm ring-1 ring-inset ring-slate-200 transition-colors hover:bg-red-50 hover:ring-red-300 dark:bg-slate-900 dark:text-red-400 dark:ring-slate-700 dark:hover:bg-red-950/30"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Çıkış Yap
                    </button>

                    <Link to="/" className="mt-3 block text-center text-xs text-slate-500 hover:underline dark:text-slate-400">
                        Siteye Dön
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
