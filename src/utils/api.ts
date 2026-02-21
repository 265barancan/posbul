import type { Provider } from "../types/provider.types";
import type { BlogPost } from "../types/blog.types";
import type { Review } from "../types/review.types";
import { PROVIDERS } from "../constants/providers";
import { BLOG_POSTS } from "../constants/blogPosts";
import { REVIEWS } from "../constants/reviews";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProviders(): Promise<Provider[]> {
    await delay(300);
    return PROVIDERS;
}

export async function fetchProviderById(id: string): Promise<Provider | null> {
    await delay(200);
    return PROVIDERS.find((p) => p.id === id) ?? null;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
    await delay(250);
    return BLOG_POSTS;
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    await delay(200);
    return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function fetchReviewsByProvider(providerId: string): Promise<Review[]> {
    await delay(200);
    return REVIEWS.filter((r) => r.providerId === providerId);
}

export async function submitReview(
    providerId: string,
    rating: number,
    comment: string
): Promise<Review> {
    await delay(500);
    return {
        id: `r-${Date.now()}`,
        providerId,
        userName: "Anonim Kullanıcı",
        rating,
        comment,
        date: new Date().toISOString().split("T")[0],
    };
}
