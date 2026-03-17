'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GtagPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
