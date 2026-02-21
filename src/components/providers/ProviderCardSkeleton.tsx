import Skeleton from "../ui/Skeleton";

export default function ProviderCardSkeleton() {
    return (
        <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between md:gap-6">
            {/* Logo + Name */}
            <div className="flex items-center gap-4 md:w-52 md:shrink-0">
                <Skeleton variant="rect" className="h-14 w-14 rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 md:flex-1 md:gap-8">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-5 w-16" />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:shrink-0">
                <Skeleton variant="rect" className="h-10 w-10 rounded-lg" />
                <Skeleton variant="rect" className="h-10 w-32 rounded-lg" />
            </div>
        </div>
    );
}
