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
    <div className="h-screen bg-gray-100 flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Chatbot Flow Builder
          </h1>
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
