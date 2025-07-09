import React from "react";
import { Handle, Position } from "reactflow";

export default function TextNode({ data }: any) {
  return (
    <div className="p-4 bg-white border rounded shadow">
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
