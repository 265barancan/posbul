import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { BLOG_POSTS } from "../constants/blogPosts";
import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();

    const post = useMemo(
        () => BLOG_POSTS.find((p) => p.slug === slug),
        [slug]
    );

    if (!post) {
        return (
            <div className="py-20 text-center">
                <span className="material-symbols-outlined mb-4 text-[64px] text-slate-300 dark:text-slate-600">
                    article
                </span>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Yazı bulunamadı
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Aradığınız blog yazısı mevcut değil.
                </p>
                <Link
                    to="/blog"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Blog'a dön
                </Link>
            </div>
        );
    }

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        return content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
                return (
                    <h2 key={i} className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-white">
                        {line.replace("## ", "")}
                    </h2>
                );
            }
            if (line.startsWith("### ")) {
                return (
                    <h3 key={i} className="mb-3 mt-6 text-lg font-bold text-slate-900 dark:text-white">
                        {line.replace("### ", "")}
                    </h3>
                );
            }
            if (line.startsWith("- **")) {
                const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                if (match) {
                    return (
                        <li key={i} className="mb-2 ml-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            <strong className="text-slate-900 dark:text-white">{match[1]}</strong>
                            {match[2] && `: ${match[2]}`}
                        </li>
                    );
                }
            }
            if (line.startsWith("- ")) {
                return (
                    <li key={i} className="mb-1.5 ml-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {line.replace("- ", "")}
                    </li>
                );
            }
            if (line.startsWith("1. ") || line.match(/^\d+\. /)) {
                return (
                    <li key={i} className="mb-2 ml-4 list-decimal text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {line.replace(/^\d+\.\s/, "").replace(/\*\*(.+?)\*\*/g, "$1")}
                    </li>
                );
            }
            if (line.startsWith("|")) {
                // Table row
                const cells = line.split("|").filter(Boolean).map((c) => c.trim());
                if (cells.every((c) => c.match(/^-+$/))) return null; // separator row
                return (
                    <tr key={i} className="border-b border-slate-200 dark:border-slate-700">
                        {cells.map((cell, j) => (
                            <td key={j} className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
                                {cell}
                            </td>
                        ))}
                    </tr>
                );
            }
            if (line.trim() === "") return <br key={i} />;
            if (line.startsWith("**")) {
                return (
                    <p key={i} className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {line.replace(/\*\*/g, "")}
                    </p>
                );
            }
            return (
                <p key={i} className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {line}
                </p>
            );
        });
    };

    return (
        <div className="py-10 sm:py-16">
            <SEO
                title={post.title}
                path={`/blog/${post.slug}`}
                description={post.excerpt}
                type="article"
                article={{
                    publishedTime: post.date,
                    author: post.author,
                    tags: [post.category],
                }}
            />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    to="/blog"
                    className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Tüm Yazılar
                </Link>

                <AnimatedSection>
                    {/* Meta */}
                    <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {post.readTime} dk okuma
                        </span>
                        <span className="text-xs text-slate-400">
                            {new Date(post.date).toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <article className="prose-slate">
                        {renderContent(post.content)}
                    </article>
                </AnimatedSection>

                {/* Back to blog */}
                <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Diğer yazılara göz at
                    </Link>
                </div>
            </div>
        </div>
    );
}
