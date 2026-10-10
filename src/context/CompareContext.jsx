import { createContext, useContext, useState, useEffect } from "react";
import { propertiesData } from "../data/propertiesData";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem("oshn_compare_list");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed
        .map((item) => {
          const id = typeof item === "string" ? item : item?.id;
          return propertiesData.find((p) => p.id === id) || (typeof item === "object" ? item : null);
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("oshn_compare_list", JSON.stringify(compareList.map((p) => p.id)));
    } catch (err) {
      console.error(err);
    }
  }, [compareList]);

  const addToCompare = (property) => {
    const propObj =
      typeof property === "string"
        ? propertiesData.find((p) => p.id === property)
        : property;
    if (!propObj) return;

    if (compareList.some((item) => item.id === propObj.id)) {
      setCompareList(compareList.filter((item) => item.id !== propObj.id));
      return;
    }

    if (compareList.length >= 3) {
      alert("You can compare up to 3 projects at a time. Please remove one to add another.");
      return;
    }

    setCompareList([...compareList, propObj]);
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((item) => item.id !== id));
  };

  const isInCompare = (id) => {
    return compareList.some((item) => item.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
