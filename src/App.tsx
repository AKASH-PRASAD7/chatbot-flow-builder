import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import FlowBuilder from "./components/FlowBuilder";
import NodesPanel from "./components/panels/NodePannel";
import SettingsPanel from "./components/panels/SettingsPannel";
import HeaderActions from "./components/HeaderActions";
import Tutorial from "./components/Tutorial"; // Import the Tutorial component
import { useFlowStore } from "./store/useStore";
import { HelpCircle } from "lucide-react"; // Import the HelpCircle icon

/**
 * Main App Component
 * Manages the layout and renders all major components
 */
const App: React.FC = () => {
  const { showSettings } = useFlowStore();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorialSeen");
    if (!tutorialSeen) {
      setShowTutorial(true);
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
      {/* Header */}
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
              className="text-gray-600 hover:text-gray-900"
              title="Help"
            >
              <HelpCircle size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Flow Builder */}
        <FlowBuilder />

        {/* Right Panel - Nodes or Settings */}
        {showSettings ? <SettingsPanel /> : <NodesPanel />}
      </div>
    </div>
  );
};

export default App;
