"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

declare global {
  interface Window {
    gtagEvent: (name: string, params?: Record<string, unknown>) => void;
  }
}

export default function GtagInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Expose helper so any component can fire GTM events
    window.gtagEvent = (name, params = {}) => {
      sendGTMEvent({ event: name, ...params });
    };
  }, []);

  // Fire page_view on every route change
  useEffect(() => {
    sendGTMEvent({
      event: "page_view",
      page_path: pathname,
      page_title: typeof document !== "undefined" ? document.title : "",
    });
  }, [pathname]);

  return null;
}