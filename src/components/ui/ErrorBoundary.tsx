import { Component, type ReactNode, type ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center py-16">
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
                            <span className="material-symbols-outlined text-[48px] text-red-400">
                                error
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Bir hata oluştu
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Beklenmeyen bir sorunla karşılaşıldı. Lütfen sayfayı yenileyin.
                        </p>
                        {this.state.error && (
                            <pre className="mx-auto mt-4 max-w-md overflow-auto rounded-lg bg-slate-100 p-3 text-left text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {this.state.error.message}
                            </pre>
                        )}
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Yenile
                            </button>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
                            >
                                <span className="material-symbols-outlined text-[18px]">home</span>
                                Ana Sayfa
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
