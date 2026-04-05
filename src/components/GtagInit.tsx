"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtagEvent: (name: string, params?: Record<string, unknown>) => void;
  }
}

export default function GtagInit() {
  const pathname = usePathname();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    // Helper for firing custom events anywhere in the app
    window.gtagEvent = (name, params = {}) => {
      window.dataLayer.push({ event: name, ...params });
    };
  }, []);

  // Push a page_view event on every route change
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pathname,
      page_title: typeof document !== "undefined" ? document.title : "",
    });
  }, [pathname]);

  return null;
}