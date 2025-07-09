import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useFlowStore } from "../../store/useStore";

const SettingsPanel: React.FC = () => {
  const { selectedNode, updateNode, setShowSettings } = useFlowStore();
  const [text, setText] = useState("");

  /**
   * Initialize text field with selected node's text
   */
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || "");
    }
  }, [selectedNode]);

  /**
   * Handle text change and update node data
   */
  const handleTextChange = (newText: string) => {
    setText(newText);
    if (selectedNode) {
      updateNode(selectedNode.id, { text: newText });
    }
  };

  /**
   * Handle back button click to return to nodes panel
   */
  const handleBack = () => {
    setShowSettings(false);
  };

  if (!selectedNode) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
      </div>

      {/* Node settings form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text
          </label>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter message text..."
            className="w-full p-2 border border-gray-300 rounded-md resize-none
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-colors duration-200"
            rows={4}
          />
        </div>

        {/* Additional settings can be added here */}
        <div className="text-xs text-gray-500">Node ID: {selectedNode.id}</div>
      </div>
    </div>
  );
};

export default SettingsPanel;
