import { Node } from "@xyflow/react";

export interface TextNodeData {
  text: string;
}

export interface NodeConfig {
  type: string;
  label: string;
  icon: string;
}

export type CustomNode = Node<TextNodeData>;

export interface NodeOperations {
  updateNode: (nodeId: string, newData: Partial<TextNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  addNode: (type: string, position: { x: number; y: number }) => void;
}
