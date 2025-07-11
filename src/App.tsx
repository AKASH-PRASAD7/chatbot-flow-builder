import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import FlowBuilder from "./components/FlowBuilder";
import NodesPanel from "./components/panels/NodePannel";
import SettingsPanel from "./components/panels/SettingsPannel";
import HeaderActions from "./components/HeaderActions";
import Tutorial from "./components/Tutorial";
import { useFlowStore } from "./store/useStore";
import { HelpCircle, PanelRightOpen, PanelLeftOpen } from "lucide-react";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const { showSettings } = useFlowStore();
  const [showTutorial, setShowTutorial] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorialSeen");
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
    // Close panel on small screens by default
    if (window.innerWidth < 768) {
      setIsPanelOpen(false);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialSeen", "true");
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
      <Toaster position="top-center" reverseOrder={false} />
      <header className="bg-slate-200 border-b border-gray-400 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex h-8 items-center">
            <img src="/logo.png" className="w-24 h-18 mt-2 cursor-pointer" />
            <h1 className="text-xl font-semibold text-gray-800 cursor-pointer">
              ChatTangle
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <HeaderActions />
            <button
              onClick={() => setShowTutorial(true)}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
              title="Help"
            >
              <HelpCircle size={24} />
            </button>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 cursor-pointer"
              title={isPanelOpen ? "Close Panel" : "Open Panel"}
            >
              {isPanelOpen ? <PanelLeftOpen size={24} /> : <PanelRightOpen size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <FlowBuilder />
        <div
          className={`transition-all duration-300 ease-in-out ${isPanelOpen ? "w-64" : "w-0"} md:w-64`}>
          {showSettings ? <SettingsPanel /> : <NodesPanel />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
