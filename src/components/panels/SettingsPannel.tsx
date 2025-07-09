import React, { useState } from "react";
import { CustomNode, TextNodeData } from "@/types";

interface SettingsPanelProps {
  selectedNode: CustomNode;
  onNodeUpdate: (nodeId: string, newData: Partial<TextNodeData>) => void;
  onBack: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onNodeUpdate,
  onBack,
}) => {
  const [text, setText] = useState<string>(selectedNode?.data?.text || "");

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const newText = e.target.value;
    setText(newText);
    onNodeUpdate(selectedNode.id, { text: newText });
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      {/* Settings panel implementation */}
    </div>
  );
};

export default SettingsPanel;
