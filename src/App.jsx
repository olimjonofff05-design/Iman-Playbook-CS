import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Imanum from "./components/Imanum";
import BNPL from "./components/BNPL";
import Invest from "./components/Invest";
import Kvadrat from "./components/Kvadrat";
import ScriptsPage from "./components/ScriptsPage";
import OfferPage from "./components/OfferPage";
import PlaybookTabs from "./components/PlaybookTabs";
import QAFeedback from "./components/QAFeedback";
import Settings from "./components/Settings";

import "./Layout.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      case "kvadrat":
        return <Kvadrat />;

      case "scripts":
        return <ScriptsPage />;

      case "offer":
        return <OfferPage />;

      case "playbookTabs":
        return <PlaybookTabs />;

      case "qa":
        return <QAFeedback />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard setPage={setPage} />;
    }
  }

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(true)} />

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

        <div className="content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;
