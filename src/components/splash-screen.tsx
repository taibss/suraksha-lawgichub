"use client";

import { useEffect, useState } from "react";
import logo from "@/assets/lawgichub-logo.png";

export function SplashScreen() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="splash-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <img
        src={logo.src}
        alt=""
        className="max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain select-none mix-blend-multiply"
      />
    </div>
  );
}
