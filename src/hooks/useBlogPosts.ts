import { useState, useEffect } from "react";
import type { BlogPost } from "../types/blog.types";
import { fetchBlogPosts } from "../utils/api";

interface UseBlogPostsReturn {
    posts: BlogPost[];
    isLoading: boolean;
    error: string | null;
}

export function useBlogPosts(): UseBlogPostsReturn {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);
                const data = await fetchBlogPosts();
                if (!cancelled) {
                    setPosts(data);
                    setError(null);
                }
            } catch {
                if (!cancelled) {
                    setError("Blog yazıları yüklenirken bir hata oluştu.");
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

    return { posts, isLoading, error };
}
