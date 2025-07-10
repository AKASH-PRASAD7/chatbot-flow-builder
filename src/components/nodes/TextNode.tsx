import React, { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageCircle, Trash2 } from "lucide-react";
import { useFlowStore } from "../../store/useStore";
import { type TextNodeData } from "../../types";

interface TextNodeProps extends NodeProps {
  data: TextNodeData;
  selected?: boolean;
}

const TextNode: React.FC<TextNodeProps> = ({ id, data, selected }) => {
  const { deleteNode } = useFlowStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={`
      bg-slate-100 border-2 rounded-2xl p-2 shadow-lg min-w-[200px] max-w-[300px]
      ${selected ? "border-blue-500  ring-blue-200" : "border-gray-300"}
      hover:border-blue-400 transition-colors duration-200 relative
    `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Delete Button */}
      {(selected || isHovered) && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                     hover:bg-red-600 transition-colors duration-200 z-10"
          aria-label="Delete node"
        >
          <Trash2 size={14} className="cursor-pointer" />
        </button>
      )}

      {/* Target Handle - Can have multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: "-6px" }}
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2 text-blue-600">
        <MessageCircle size={16} />
        <span className="font-semibold text-sm">Send Message</span>
      </div>

      {/* Node Content */}
      <div className="text-sm text-gray-700 break-words">
        {data.text || "Click to edit message"}
      </div>

      {/* Source Handle - Only one outgoing connection allowed */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
        style={{ right: "-6px" }}
      />
    </div>
  );
};

export default TextNode;
