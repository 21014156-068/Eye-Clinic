import { createContext, useContext, useEffect, useState } from "react";
import { requestJson } from "../lib/api";

const PublicSiteContext = createContext(null);

export function PublicSiteProvider({ children }) {
  const [data, setData] = useState({
    doctors: [],
    services: [],
    settings: null,
  });
  const [loading, setLoading] = useState(true);

  const fetchPublicData = async () => {
    setLoading(true);
    try {
      // Calls your brilliant backend bootstrap route
      const json = await requestJson("/api/public/bootstrap");
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
        ...data, // spreads doctors, services, settings
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
