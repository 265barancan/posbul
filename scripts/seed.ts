import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/lib/firebase";
import { PROVIDERS } from "../src/constants/providers";
import { REVIEWS } from "../src/constants/reviews";
import { BLOG_POSTS } from "../src/constants/blogPosts";

async function seed() {
    console.log("🔥 Veritabanı (Firestore) Seeding işlemi başlatılıyor...");

    try {
        console.log("\n📦 Sağlayıcılar yükleniyor...");
        for (const provider of PROVIDERS) {
            await setDoc(doc(db, "providers", provider.id), provider);
            console.log(`   ✅ Eklendi: ${provider.name}`);
        }

        console.log("\n💬 Yorumlar yükleniyor...");
        for (const review of REVIEWS) {
            await setDoc(doc(db, "reviews", review.id), review);
            console.log(`   ✅ Eklendi: ${review.author} (${review.providerId})`);
        }

        console.log("\n📝 Blog Yazıları yükleniyor...");
        for (const post of BLOG_POSTS) {
            // Create a copy and add a createdAt field if needed, or just insert
            await setDoc(doc(db, "blog_posts", post.slug), post);
            console.log(`   ✅ Eklendi: ${post.title}`);
        }

        console.log("\n🎉 Seeding başarıyla tamamlandı!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Hata oluştu:", error);
        process.exit(1);
    }
}

seed();
