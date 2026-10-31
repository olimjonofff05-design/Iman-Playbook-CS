import { useEffect, useState } from "react";
import ImanMark from "./ImanMark";
import "./SplashScreen.css";

const SESSION_KEY = "iman-playbook-splash-shown";

function SplashScreen({ onDone }) {
  const [visible] = useState(() => !sessionStorage.getItem(SESSION_KEY));
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }

    const leaveTimer = setTimeout(() => setLeaving(true), 1200);
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      onDone();
    }, 1650);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`splash ${leaving ? "splash-leaving" : ""}`}>
      <span className="splash-logo brand-badge">
        <ImanMark size={50} title="IMANUM" />
      </span>
      <div className="splash-text">
        <span>IMANUM</span>
        <span className="splash-text-accent">Playbook</span>
      </div>
      <div className="splash-bar" />
    </div>
  );
}

export default SplashScreen;
