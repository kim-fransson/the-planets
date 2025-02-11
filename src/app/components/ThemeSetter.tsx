"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ThemeSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const planet = pathname.replace("/", "") || "earth";
    document.documentElement.setAttribute("data-theme", planet);
  }, [pathname]);

  return null;
}
