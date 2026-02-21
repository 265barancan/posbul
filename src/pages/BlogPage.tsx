import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../constants/blogPosts";
import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";
import { motion } from "framer-motion";

export default function BlogPage() {
    return (
        <div className="py-10 sm:py-16">
            <SEO
                title="Blog"
                path="/blog"
                description="Sanal POS, e-ticaret ödeme çözümleri ve sektör trendleri hakkında güncel içerikler."
            />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                        POS<span className="text-primary">Bul</span> Blog
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-base text-slate-500 dark:text-slate-400">
                        Sanal POS, e-ticaret ödeme çözümleri ve sektör trendleri hakkında
                        güncel içerikler.
                    </p>
                </AnimatedSection>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {BLOG_POSTS.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" as const }}
                        >
                            <Link
                                to={`/blog/${post.slug}`}
                                className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/50"
                            >
                                {/* Icon Header */}
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                                    <span className="material-symbols-outlined text-[24px] text-primary">
                                        {post.icon}
                                    </span>
                                </div>

                                {/* Category + Read Time */}
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                                        {post.readTime} dk okuma
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                    {post.excerpt}
                                </p>

                                {/* Date + Arrow */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">
                                        {new Date(post.date).toLocaleDateString("tr-TR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span className="material-symbols-outlined text-[18px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                        arrow_forward
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
