import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingDock } from "./components/FloatingDock";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { SiteUtilityBar } from "./components/SiteUtilityBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { brand, utilityHighlights } from "./data/siteContent";
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import { AdminRoute } from "./admin/AdminRoute";
import { PublicSiteProvider } from "./hooks/PublicSiteContext";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import ErrorPage from "./pages/ErrorPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TechnologyPage = lazy(() => import("./pages/TechnologyPage"));
const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AppointmentPage = lazy(() => import("./pages/AppointmentPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function getRouteTheme(pathname) {
  if (pathname === "/") {
    return "home";
  }
  return pathname.replaceAll("/", "") || "home";
}

function RouteRenderer({ location }) {
  const routeTheme = getRouteTheme(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className={`route-frame route-frame-${routeTheme}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense
          fallback={
            <div className="route-loading">Loading EyeCon experience...</div>
          }
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanelPage />
                </AdminRoute>
              }
            />
            <Route path="/admin/*" element={<AdminLoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const routeTheme = getRouteTheme(location.pathname);

  // Check if current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className={`site-shell theme-${routeTheme}`}>
      <ScrollToTop />
      <div className="site-noise" aria-hidden="true" />

      {/* Hide Utility Bar, Header, and Beams on Admin pages */}
      {!isAdminRoute && (
        <>
          <div className="site-beam site-beam-a" aria-hidden="true" />
          <div className="site-beam site-beam-b" aria-hidden="true" />
          <SiteUtilityBar items={utilityHighlights} />
          <SiteHeader />
        </>
      )}

      <RouteRenderer location={location} />

      {/* Hide Footer and Floating Dock on Admin pages */}
      {!isAdminRoute && (
        <>
          <SiteFooter brand={brand} />
          <FloatingDock brand={brand} />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <PublicSiteProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AdminAuthProvider>
    </PublicSiteProvider>
  );
}

export default App;
