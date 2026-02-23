import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    ogImage?: string;
    type?: "website" | "article";
    article?: {
        publishedTime?: string;
        author?: string;
        tags?: string[];
        modifiedTime?: string;
    };
}

const SITE_NAME = "POSBul";
const BASE_URL = "https://posbul.com";
const DEFAULT_DESCRIPTION =
    "Türkiye'nin en güncel sanal POS karşılaştırma platformu. En iyi sanal POS oranlarını saniyeler içinde karşılaştırın.";

export default function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    path = "",
    ogImage = "/og-image.png",
    type = "website",
    article,
}: SEOProps) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Sanal POS Karşılaştırma Platformu`;
    const url = `${BASE_URL}${path}`;

    // Generate JSON-LD Structured Data
    const structuredData = type === "article" && article ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": fullTitle,
        "image": [`${BASE_URL}${ogImage}`],
        "datePublished": article.publishedTime,
        "dateModified": article.modifiedTime || article.publishedTime,
        "author": [{
            "@type": "Person",
            "name": article.author || SITE_NAME,
        }],
        "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`
            }
        },
        "description": description
    } : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": BASE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${BASE_URL}/karsilastir?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="tr_TR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${BASE_URL}${ogImage}`} />

            {/* Article specific */}
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.author && (
                <meta property="article:author" content={article.author} />
            )}
            {article?.tags?.map((tag) => (
                <meta key={tag} property="article:tag" content={tag} />
            ))}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
