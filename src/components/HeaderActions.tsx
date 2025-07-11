import React, { useState } from "react";
import { Save, Trash2, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { useFlowStore } from "../store/useStore";

const HeaderActions: React.FC = () => {
  const { validateFlow, clearAll } = useFlowStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSave = () => {
    const validation = validateFlow();
    if (validation.isValid) {
      toast.success("Flow saved successfully!");
      console.log("Flow saved!");
    } else {
      toast.error(`Cannot save flow: ${validation.error}`);
    }
    setIsMenuOpen(false); // Close menu after action
  };

  const handleClear = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">
            Are you sure you want to clear the flow?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                clearAll();
                toast.dismiss(t.id);
                toast.success("Flow cleared!");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700"
            >
              Yes, clear it
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
    setIsMenuOpen(false); // Close menu after action
  };

  return (
    <div className="relative">
      {/* Desktop view */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-lime-600 text-white 
                     rounded-xl hover:bg-lime-700 transition-colors duration-200
                     font-medium shadow-sm cursor-pointer"
        >
          <Save size={16} />
          Save Changes
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white 
                     rounded-xl hover:bg-red-700 transition-colors duration-200
                     font-medium shadow-sm cursor-pointer"
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-300"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderActions;
