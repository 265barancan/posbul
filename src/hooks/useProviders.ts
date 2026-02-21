import { useState, useEffect } from "react";
import type { Provider } from "../types/provider.types";
import { fetchProviders } from "../utils/api";

interface UseProvidersReturn {
    providers: Provider[];
    isLoading: boolean;
    error: string | null;
}

export function useProviders(): UseProvidersReturn {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                const data = await fetchProviders();
                if (!cancelled) {
                    setProviders(data);
                    setError(null);
                }
            } catch {
                if (!cancelled) {
                    setError("Sağlayıcılar yüklenirken bir hata oluştu.");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { providers, isLoading, error };
}
