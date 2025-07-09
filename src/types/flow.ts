import { Node, Edge } from "@xyflow/react";

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

export interface FlowValidation {
  isValid: boolean;
  errors: string[];
}

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
}
