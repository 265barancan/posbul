export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    readTime: number;
    category: string;
    icon: string;
    metaDescription?: string;
    focusKeywords?: string[];
    coverImage?: string;
}
