import React from "react";
import { Save } from "lucide-react";
import { useFlowStore } from "../store/useStore";

const SaveButton: React.FC = () => {
  const { validateFlow } = useFlowStore();

  /**
   * Handle save button click
   * Validates the flow and shows appropriate feedback
   */
  const handleSave = () => {
    const validation = validateFlow();

    if (validation.isValid) {
      alert("Flow saved successfully!");
      console.log("Flow saved!");
    } else {
      alert(`Cannot save flow: ${validation.error}`);
    }
  };

  return (
    <button
      onClick={handleSave}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
               rounded-md hover:bg-blue-700 transition-colors duration-200
               font-medium shadow-sm"
    >
      <Save size={16} />
      Save Changes
    </button>
  );
};

export default SaveButton;
