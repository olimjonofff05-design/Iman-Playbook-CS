import { useEffect, useState } from "react";
import logo from "../assets/iman-logo.png";
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
      <img src={logo} alt="IMAN" className="splash-logo" />
      <div className="splash-text">
        <span>IMAN</span>
        <span className="splash-text-accent">Playbook</span>
      </div>
    </div>
  );
}

export default SplashScreen;
