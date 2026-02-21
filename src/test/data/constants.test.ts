import { describe, it, expect } from "vitest";
import { PROVIDERS } from "../../constants/providers";
import { BLOG_POSTS } from "../../constants/blogPosts";
import { REVIEWS } from "../../constants/reviews";

describe("providers data", () => {
    it("has at least 3 providers", () => {
        expect(PROVIDERS.length).toBeGreaterThanOrEqual(3);
    });

    it("every provider has required fields", () => {
        for (const p of PROVIDERS) {
            expect(p.id).toBeTruthy();
            expect(p.name).toBeTruthy();
            expect(p.commissionRate.min).toBeGreaterThan(0);
            expect(p.paymentSpeedHours).toBeGreaterThanOrEqual(0);
            expect(p.features.length).toBeGreaterThan(0);
            expect(["bireysel", "kurumsal", "her ikisi"]).toContain(p.segment);
            expect(p.rating).toBeGreaterThanOrEqual(0);
            expect(p.rating).toBeLessThanOrEqual(5);
        }
    });

    it("has unique provider ids", () => {
        const ids = PROVIDERS.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe("blogPosts data", () => {
    it("has at least 1 post", () => {
        expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(1);
    });

    it("every post has required fields", () => {
        for (const post of BLOG_POSTS) {
            expect(post.slug).toBeTruthy();
            expect(post.title).toBeTruthy();
            expect(post.excerpt).toBeTruthy();
            expect(post.content).toBeTruthy();
            expect(post.date).toBeTruthy();
            expect(post.author).toBeTruthy();
            expect(post.readTime).toBeGreaterThan(0);
        }
    });

    it("has unique slugs", () => {
        const slugs = BLOG_POSTS.map((p) => p.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });
});

describe("reviews data", () => {
    it("has at least 1 review", () => {
        expect(REVIEWS.length).toBeGreaterThanOrEqual(1);
    });

    it("every review has valid rating", () => {
        for (const r of REVIEWS) {
            expect(r.rating).toBeGreaterThanOrEqual(1);
            expect(r.rating).toBeLessThanOrEqual(5);
        }
    });
});
