import React from "react";
import { MessageCircle } from "lucide-react";

const NodesPanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-full h-full bg-slate-200 border-l border-gray-400 p-4 overflow-y-auto">
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

      <div className="mt-4 text-xs text-gray-500">
        More node types will be added here in the future...
      </div>
    </div>
  );
};

export default NodesPanel;
