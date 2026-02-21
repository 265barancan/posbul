import SEO from "../../components/ui/SEO";

export default function AdminPlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex h-full min-h-[50vh] flex-col items-center justify-center space-y-4">
            <SEO title={title} path={`/admin/${title.toLowerCase()}`} description={`POSBul Admin - ${title}`} />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
                <span className="material-symbols-outlined text-[32px] text-indigo-500">construction</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title} Yönetimi</h1>
            <p className="max-w-md text-center text-slate-500 dark:text-slate-400">
                Bu bölüm şu anda yapım aşamasındadır. Gelecek geliştirmelerde (Firebase entegrasyonu ile) "Ekle/Sil/Düzenle" modülleri buraya entegre edilecektir.
            </p>
        </div>
    );
}
