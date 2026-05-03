import { createContext, useContext, useEffect, useState } from "react";

const PublicSiteContext = createContext(null);

export function PublicSiteProvider({ children }) {
  const [data, setData] = useState({
    doctors: [],
    services: [],
    insights: [],
    settings: null,
  });
  const [loading, setLoading] = useState(true);

  const fetchPublicData = async () => {
    setLoading(true);
    try {
      // Calls your brilliant backend bootstrap route
      const response = await fetch("/api/public/bootstrap");
      if (!response.ok) throw new Error("Failed to fetch public data");

      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error("Public fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data immediately when the app loads
  useEffect(() => {
    fetchPublicData();
  }, []);

  return (
    <PublicSiteContext.Provider
      value={{
        ...data, // spreads doctors, services, insights, settings
        loading,
        refreshPublicSite: fetchPublicData,
      }}
    >
      {children}
    </PublicSiteContext.Provider>
  );
}

// Custom hook to be used in any public page
export const usePublicSite = () => useContext(PublicSiteContext);
