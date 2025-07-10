import React from "react";
import { Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useFlowStore } from "../store/useStore";

const HeaderActions: React.FC = () => {
  const { validateFlow, clearAll } = useFlowStore();

  const handleSave = () => {
    const validation = validateFlow();
    if (validation.isValid) {
      toast.success("Flow saved successfully!");
      console.log("Flow saved!");
    } else {
      toast.error(`Cannot save flow: ${validation.error}`);
    }
  };

  const handleClear = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">Are you sure you want to clear the flow?</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                clearAll();
                toast.dismiss(t.id);
                toast.success("Flow cleared!");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes, clear it
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000, // Keep the toast open longer for confirmation
      }
    );
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
