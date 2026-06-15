import { useEffect, useState } from "react";
import logo from "@/assets/lawgichub-logo.png";

const ENTER_MS = 400;
const VISIBLE_MS = 500;
const EXIT_MS = 400;

export function SplashScreen() {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), ENTER_MS);
    const t2 = setTimeout(() => setPhase("exit"), ENTER_MS + VISIBLE_MS);
    const t3 = setTimeout(() => setPhase("done"), ENTER_MS + VISIBLE_MS + EXIT_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--background)",
  };

  const exitActive = phase === "exit";
  const imgStyle: React.CSSProperties = exitActive
    ? {
        opacity: 0,
        transform: "scale(0.85)",
        transition: `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`,
      }
    : {};

  return (
    <div style={containerStyle}>
      <img
        src={logo}
        alt=""
        className={`max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain select-none mix-blend-multiply ${
          exitActive ? "" : "splash-enter"
        }`}
        style={imgStyle}
      />
    </div>
  );
}
