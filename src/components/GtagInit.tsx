"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtagEvent: (name: string, params?: Record<string, unknown>) => void;
  }
}

export default function GtagInit({ gaId }: { gaId: string }) {
  const pathname = usePathname();

  // Expose gtagEvent helper for use anywhere in the app
  useEffect(() => {
    window.gtagEvent = (name, params = {}) => {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params);
      }
    };
  }, []);

  // Fire page_view on every route change (including initial load)
  useEffect(() => {
    if (!gaId || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [gaId, pathname]);

  return null;
}
