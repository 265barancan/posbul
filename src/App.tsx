import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useThemeStore } from "./store/themeStore";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollRestore from "./components/ui/ScrollRestore";
import ToastContainer from "./components/ui/ToastContainer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import HomePage from "./pages/HomePage";

// --- Main Site Lazy Pages ---
const ComparePage = lazy(() => import("./pages/ComparePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// --- Admin Lazy Pages ---
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminProvidersPage = lazy(() => import("./pages/admin/AdminProvidersPage"));
const AdminReviewsPage = lazy(() => import("./pages/admin/AdminReviewsPage"));
const AdminPlaceholderPage = lazy(() => import("./pages/admin/AdminPlaceholderPage"));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

// Main website layout with Header and Footer
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ErrorBoundary>
        <div className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </ErrorBoundary>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  const init = useThemeStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollRestore />
        <ToastContainer />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <Suspense fallback={<PageLoader />}><AdminLoginPage /></Suspense>
          } />

          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute />
            </Suspense>
          }>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="providers" element={<AdminProvidersPage />} />
              <Route path="reviews" element={<AdminReviewsPage />} />
              <Route path="blog" element={<AdminPlaceholderPage title="Blog" />} />
              <Route path="settings" element={<AdminPlaceholderPage title="Ayarlar" />} />
            </Route>
          </Route>

          {/* Main Website Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/karsilastir" element={<ComparePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/sss" element={<FaqPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/gizlilik" element={<PrivacyPage />} />
            <Route path="/kullanim-kosullari" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
