import { lazy, Suspense, useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SplashScreen from "./components/SplashScreen";
import PageLoader from "./components/PageLoader";
import SkyBackground from "./components/SkyBackground";

// Har bir sahifa alohida yuklanadi — birinchi ochilish tezroq bo'ladi
const Dashboard = lazy(() => import("./components/Dashboard"));
const About = lazy(() => import("./components/About"));
const Imanum = lazy(() => import("./components/Imanum"));
const BNPL = lazy(() => import("./components/BNPL"));
const Invest = lazy(() => import("./components/Invest"));
const InvestCalc = lazy(() => import("./components/InvestCalc"));
const WorkDays = lazy(() => import("./components/WorkDays"));
const Kvadrat = lazy(() => import("./components/Kvadrat"));
const Ident = lazy(() => import("./components/Ident"));
const ScriptsPage = lazy(() => import("./components/ScriptsPage"));
const OfferPage = lazy(() => import("./components/OfferPage"));
const PlaybookTabs = lazy(() => import("./components/PlaybookTabs"));
const QAFeedback = lazy(() => import("./components/QAFeedback"));
const Settings = lazy(() => import("./components/Settings"));
const AttestationPage = lazy(() => import("./components/attestation/AttestationPage"));
const AdminPanel = lazy(() => import("./components/attestation/AdminPanel"));
import ExamMode from "./components/attestation/ExamMode";
import { useExamLock, TAB_ID, setLock, getLock } from "./attestation/examLock";
import { useAuth } from "./context/AuthContext";
import { api } from "./attestation/api";

import "./Layout.css";

const PAGES = [
  "dashboard", "about", "imanum", "bnpl", "invest", "investCalc", "workDays", "kvadrat",
  "ident", "scripts", "offer", "playbookTabs", "qa", "attestation", "admin", "settings",
];

// Joriy sahifa URL hash'da saqlanadi: yangilaganda yo'qolmaydi, "orqaga" tugmasi ishlaydi
function pageFromHash() {
  const key = window.location.hash.replace(/^#\/?/, "");
  return PAGES.includes(key) ? key : "dashboard";
}

function App() {
  const [page, setPageState] = useState(pageFromHash);
  const contentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const lock = useExamLock();
  const { user } = useAuth();

  // Xodim boshqa qurilma/brauzerda boshlagan imtihoni bo'lsa ham, kirishi bilan imtihon rejimi yoqiladi
  useEffect(() => {
    if (!user || user.role !== "user" || getLock()) return;
    api
      .exam("list")
      .then((d) => {
        const running = d.available.find((e) => e.status === "in_progress");
        if (running) setLock({ attemptId: running.attemptId, deadline: running.deadline, userId: user.id });
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    const onHash = () => setPageState(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Yangi sahifa ochilganda kontent yuqoridan boshlanadi
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  function setPage(key) {
    if (key === page) return;
    window.location.hash = key === "dashboard" ? "" : `/${key}`;
    setPageState(key);
  }

  // Imtihon davomida playbook umuman ko'rsatilmaydi
  const examActive = lock && !(lock.submitted && lock.owner && lock.owner !== TAB_ID);
  if (examActive) return <ExamMode lock={lock} />;

  function renderPage() {
    switch (page) {
      case "dashboard":
        return <Dashboard setPage={setPage} />;

      case "about":
        return <About />;

      case "imanum":
        return <Imanum />;

      case "bnpl":
        return <BNPL />;

      case "invest":
        return <Invest />;

      case "investCalc":
        return <InvestCalc />;

      case "workDays":
        return <WorkDays />;

      case "kvadrat":
        return <Kvadrat />;

      case "ident":
        return <Ident />;

      case "scripts":
        return <ScriptsPage />;

      case "offer":
        return <OfferPage />;

      case "playbookTabs":
        return <PlaybookTabs />;

      case "qa":
        return <QAFeedback />;

      case "attestation":
        return <AttestationPage setPage={setPage} />;

      case "admin":
        return <AdminPanel />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard setPage={setPage} />;
    }
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <div style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <SkyBackground />
        <Header onMenuClick={() => setSidebarOpen(true)} setPage={setPage} />

        <div className="layout">
          <Sidebar
            page={page}
            setPage={(key) => {
              setPage(key);
              setSidebarOpen(false);
            }}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="content" ref={contentRef}>
            <div key={page}>
              <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
