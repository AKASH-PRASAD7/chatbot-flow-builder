export interface TextNodeData {
  id: string;
  text: string;
  label: string;
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: TextNodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  animated?: boolean;
}

export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNode: FlowNode | null;
  showSettings: boolean;
  addNode: (node: FlowNode) => void;
  updateNode: (nodeId: string, data: Partial<TextNodeData>) => void;
  setNodes: (nodes: FlowNode[]) => void;
  setEdges: (edges: FlowEdge[]) => void;
  setSelectedNode: (node: FlowNode | null) => void;
  setShowSettings: (show: boolean) => void;
  validateFlow: () => { isValid: boolean; error?: string };
}
