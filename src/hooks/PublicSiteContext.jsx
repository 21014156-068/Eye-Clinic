import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { brand as fallbackBrand, doctors as fallbackDoctors, insightsPage, servicesPage } from "../data/siteContent";
import { requestJson } from "../lib/api";

const fallbackSettings = {
  aboutHeadline: "Premium eye care, shaped to feel clear, calm, and confidently modern.",
  aboutSummary:
    "EyeCon is designed as an advanced vision clinic where precision diagnostics, specialist guidance, and patient comfort all belong to the same experience.",
  brandName: fallbackBrand.name,
  email: fallbackBrand.email,
  hours: fallbackBrand.hours,
  location: fallbackBrand.location,
  phone: fallbackBrand.phone,
  signature: fallbackBrand.signature,
  tagline: fallbackBrand.tagline,
  whatsapp: fallbackBrand.whatsapp || "923001112233",
};

const fallbackPublicData = {
  doctors: fallbackDoctors.map((doctor, index) => ({
    ...doctor,
    _id: `fallback-doctor-${index}`,
    active: true,
    displayOrder: index + 1,
    featured: index < 2,
    slug: doctor.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  })),
  insights: insightsPage.posts.map((post, index) => ({
    ...post,
    _id: `fallback-insight-${index}`,
    content: post.excerpt,
    displayOrder: index + 1,
    featured: index === 0,
    slug: post.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    status: "published",
  })),
  services: servicesPage.serviceLines.map((service, index) => ({
    ...service,
    _id: `fallback-service-${index}`,
    active: true,
    displayOrder: index + 1,
    featured: index < 4,
    slug: service.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  })),
  settings: fallbackSettings,
};

const PublicSiteContext = createContext(null);

export function PublicSiteProvider({ children }) {
  const [data, setData] = useState(fallbackPublicData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshPublicSite = async () => {
    try {
      setLoading(true);
      const payload = await requestJson("/api/public/bootstrap");

      if (payload.data) {
        setData({
          doctors: payload.data.doctors?.length ? payload.data.doctors : fallbackPublicData.doctors,
          insights: payload.data.insights?.length ? payload.data.insights : fallbackPublicData.insights,
          services: payload.data.services?.length ? payload.data.services : fallbackPublicData.services,
          settings: payload.data.settings || fallbackPublicData.settings,
        });
      }

      setError("");
    } catch (requestError) {
      setError(requestError.message);
      setData(fallbackPublicData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPublicSite();
  }, []);

  const brand = useMemo(
    () => ({
      email: data.settings.email,
      hours: data.settings.hours,
      location: data.settings.location,
      name: data.settings.brandName,
      phone: data.settings.phone,
      signature: data.settings.signature,
      tagline: data.settings.tagline,
      whatsapp: data.settings.whatsapp,
    }),
    [data.settings],
  );

  const value = useMemo(
    () => ({
      brand,
      error,
      insights: data.insights,
      loading,
      refreshPublicSite,
      services: data.services,
      settings: data.settings,
      doctors: data.doctors,
    }),
    [brand, data.doctors, data.insights, data.services, data.settings, error, loading],
  );

  return <PublicSiteContext.Provider value={value}>{children}</PublicSiteContext.Provider>;
}

export function usePublicSite() {
  const context = useContext(PublicSiteContext);

  if (!context) {
    throw new Error("usePublicSite must be used within PublicSiteProvider.");
  }

  return context;
}

