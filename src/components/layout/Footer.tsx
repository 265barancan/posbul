import { Link } from "react-router-dom";

const FOOTER_LINKS = {
    products: {
        title: "Ürünler",
        links: [
            { label: "Sanal POS Karşılaştırma", href: "/#oranlar" },
            { label: "Komisyon Hesaplayıcı", href: "/#hesaplayici" },
            { label: "Karşılaştır", href: "/karsilastir" },
            { label: "Blog", href: "/blog" },
        ],
    },
    company: {
        title: "Kurumsal",
        links: [
            { label: "Hakkımızda", href: "/hakkimizda" },
            { label: "SSS", href: "/sss" },
            { label: "İletişim", href: "/iletisim" },
        ],
    },
    support: {
        title: "Yasal",
        links: [
            { label: "Gizlilik Politikası", href: "/gizlilik" },
            { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
        ],
    },
};

function FooterLink({ href, label }: { href: string; label: string }) {
    if (href.startsWith("/#")) {
        return (
            <a
                href={href}
                className="text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
            >
                {label}
            </a>
        );
    }
    return (
        <Link
            to={href}
            className="text-sm text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
        >
            {label}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                <span className="material-symbols-outlined text-[20px] text-white">payments</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                POS<span className="text-primary">Bul</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Türkiye'nin en güncel sanal POS karşılaştırma platformu. En iyi oranları bulun, doğru kararı verin.
                        </p>
                    </div>

                    {/* Link Columns */}
                    {Object.values(FOOTER_LINKS).map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} POSBul. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-4">
                        {["Troy", "Visa", "Mastercard"].map((name) => (
                            <span
                                key={name}
                                className="text-xs font-semibold uppercase tracking-widest text-slate-300 dark:text-slate-600"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
