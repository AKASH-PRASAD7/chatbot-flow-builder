import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { TextNodeData } from "@/types";

const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${
        selected ? "border-blue-500" : "border-gray-200"
      } min-w-[200px] relative`}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white"
      />

      {/* Node content */}
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <span className="text-sm font-medium text-gray-700">Send Message</span>
      </div>

      <div className="text-sm text-gray-600 break-words">
        {data.text || "Enter your message..."}
      </div>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white"
      />
    </div>
  );
};

export default TextNode;
