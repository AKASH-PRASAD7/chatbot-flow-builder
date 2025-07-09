import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageCircle } from "lucide-react";
import { type TextNodeData } from "../../types";

interface TextNodeProps extends NodeProps {
  data: TextNodeData;
  selected?: boolean;
}

const TextNode: React.FC<TextNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`
      bg-white border-2 rounded-lg p-4 shadow-lg min-w-[200px] max-w-[300px]
      ${selected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"}
      hover:border-blue-400 transition-colors duration-200
    `}
    >
      {/* Target Handle - Can have multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: "-6px" }}
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2 text-purple-600">
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
