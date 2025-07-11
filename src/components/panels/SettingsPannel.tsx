import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useFlowStore } from "../../store/useStore";

const SettingsPanel: React.FC = () => {
  const { selectedNode, updateNode, setShowSettings } = useFlowStore();
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || "");
    }
  }, [selectedNode]);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleTextBlur = useCallback(() => {
    if (selectedNode && text !== selectedNode.data.text) {
      updateNode(selectedNode.id, { text });
    }
  }, [selectedNode, text, updateNode]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey) {
        handleTextBlur();
      }
    },
    [handleTextBlur]
  );

  const handleBack = () => {
    if (selectedNode && text !== selectedNode.data.text) {
      updateNode(selectedNode.id, { text });
    }
    setShowSettings(false);
  };

  if (!selectedNode) return null;

  return (
    <div className="w-full h-full bg-slate-200 border-l border-gray-400 p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text
          </label>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyPress}
            placeholder="Enter message text..."
            className="w-full p-2 border border-gray-400 rounded-md resize-none
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-colors duration-200 text-black"
            rows={4}
          />
        </div>

        <div className="text-xs text-gray-500">Node ID: {selectedNode.id}</div>
      </div>
    </div>
  );
};

export default SettingsPanel;
