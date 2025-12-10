"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SavedContextType = {
  savedIds: number[];
  toggleSave: (id: number) => void;
  isSaved: (id: number) => boolean;
};

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("obsidian_saved");
    if (stored) {
      setSavedIds(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  // 2. Save to LocalStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("obsidian_saved", JSON.stringify(savedIds));
    }
  }, [savedIds, isLoaded]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSaved = (id: number) => savedIds.includes(id);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSaved must be used within a SavedProvider");
  return context;
};