import React from "react";
import { Save, Trash2 } from "lucide-react";
import { useFlowStore } from "../store/useStore";

const HeaderActions: React.FC = () => {
  const { validateFlow, clearAll } = useFlowStore();

  const handleSave = () => {
    const validation = validateFlow();
    if (validation.isValid) {
      alert("Flow saved successfully!");
      console.log("Flow saved!");
    } else {
      alert(`Cannot save flow: ${validation.error}`);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the flow?")) {
      clearAll();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
                   rounded-md hover:bg-blue-700 transition-colors duration-200
                   font-medium shadow-sm"
      >
        <Save size={16} />
        Save Changes
      </button>
      <button
        onClick={handleClear}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white 
                   rounded-md hover:bg-red-700 transition-colors duration-200
                   font-medium shadow-sm"
      >
        <Trash2 size={16} />
        Clear All
      </button>
    </div>
  );
};

export default HeaderActions;
