import React from "react";
import { MessageCircle } from "lucide-react";

const NodesPanel: React.FC = () => {
  /**
   * Handle drag start event for node creation
   * This sets the data transfer with node type information
   */
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Nodes Panel</h2>

      {/* Draggable Message Node */}
      <div
        className="flex items-center gap-3 p-3 bg-blue-50 border-2 border-dashed 
                   border-blue-300 rounded-lg cursor-grab hover:bg-blue-100 
                   transition-colors duration-200"
        draggable
        onDragStart={(event) => onDragStart(event, "textNode")}
      >
        <MessageCircle className="text-blue-600" size={20} />
        <span className="text-sm font-medium text-blue-800">Message</span>
      </div>

      {/* Placeholder for future node types */}
      <div className="mt-4 text-xs text-gray-500">
        More node types will be added here in the future...
      </div>
    </div>
  );
};

export default NodesPanel;
