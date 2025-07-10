import React from "react";
import { Toaster } from "react-hot-toast";
import FlowBuilder from "./components/FlowBuilder";
import NodesPanel from "./components/panels/NodePannel";
import SettingsPanel from "./components/panels/SettingsPannel";
import HeaderActions from "./components/HeaderActions";
import { useFlowStore } from "./store/useStore";

/**
 * Main App Component
 * Manages the layout and renders all major components
 */
const App: React.FC = () => {
  const { showSettings } = useFlowStore();

  return (
    <div className="h-screen bg-white flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <header className="bg-slate-200 border-b border-gray-400 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex  h-8 items-center">
            <img src="/logo.png" className="w-24 h-18 mt-2 cursor-pointer" />
            <h1 className="text-xl font-semibold text-gray-800 cursor-pointer">
              ChatTangle
            </h1>
          </div>
          <HeaderActions />
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
