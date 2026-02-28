import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";
import Button from "../ui/Button";

import { useTranslation } from "react-i18next";

const NAV_LINKS = [
    { key: "rates", href: "/#oranlar" },
    { key: "compare", href: "/karsilastir" },
    { key: "blog", href: "/blog" },
    { key: "about", href: "/hakkimizda" },
];

function NavLink({
    link,
    label,
    pathname,
    onClick,
}: {
    link: { key: string; href: string };
    label: string;
    pathname: string;
    onClick?: () => void;
}) {
    const isActive =
        link.href === pathname ||
        (link.href !== "/" && pathname.startsWith(link.href));

    // Anchor links on the home page
    if (link.href.startsWith("/#")) {
        return (
            <a
                href={link.href}
                onClick={onClick}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
            >
                {label}
            </a>
        );
    }

    return (
        <Link
            to={link.href}
            onClick={onClick}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-primary/10 text-primary"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
        >
            {label}
        </Link>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isDark, toggle } = useThemeStore();
    const { pathname } = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        const newLang = i18n.language === "tr" ? "en" : "tr";
        i18n.changeLanguage(newLang);
    };

    const toggleMobile = useCallback(() => setMobileOpen((p) => !p), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-background-dark/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5" aria-label="POSBul Ana Sayfa">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <span className="material-symbols-outlined text-[20px] text-white">payments</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                            POS<span className="text-primary">Bul</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
                        {NAV_LINKS.map((link) => (
                            <NavLink key={link.href} link={link} label={t(`nav.${link.key}`)} pathname={pathname} />
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={changeLanguage}
                            className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-sm font-bold text-slate-500 uppercase transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            aria-label={t("header.changeLanguage")}
                        >
                            {i18n.language === "tr" ? "EN" : "TR"}
                        </button>

                        <button
                            onClick={toggle}
                            className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            aria-label={isDark ? t("header.lightMode") : t("header.darkMode")}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {isDark ? "light_mode" : "dark_mode"}
                            </span>
                        </button>

                        <Button variant="ghost" size="sm">
                            {t("nav.login")}
                        </Button>
                        <Button variant="primary" size="sm">
                            {t("nav.register")}
                        </Button>
                    </div>

                    {/* Mobile Buttons */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={changeLanguage}
                            className="cursor-pointer rounded-lg p-2 text-sm font-bold text-slate-500 uppercase transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            aria-label={t("header.changeLanguage")}
                        >
                            {i18n.language === "tr" ? "EN" : "TR"}
                        </button>
                        <button
                            onClick={toggle}
                            className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            aria-label={isDark ? t("header.lightMode") : t("header.darkMode")}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {isDark ? "light_mode" : "dark_mode"}
                            </span>
                        </button>
                        <button
                            onClick={toggleMobile}
                            className="cursor-pointer rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            aria-label="Menüyü aç"
                            aria-expanded={mobileOpen}
                        >
                            <span className="material-symbols-outlined text-[22px]">
                                {mobileOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-30 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={closeMobile}
                        aria-hidden="true"
                    />
                    <nav
                        className="absolute right-0 top-16 h-[calc(100vh-4rem)] w-72 border-l border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                        aria-label="Mobil menü"
                    >
                        <div className="flex flex-col gap-1">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.href}
                                    link={link}
                                    label={t(`nav.${link.key}`)}
                                    pathname={pathname}
                                    onClick={closeMobile}
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                            <Button variant="outline" className="w-full justify-center">
                                {t("nav.login")}
                            </Button>
                            <Button variant="primary" className="w-full justify-center">
                                {t("nav.register")}
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
