import { create } from "zustand";
import {
  type FlowState,
  type FlowNode,
  type FlowEdge,
  type TextNodeData,
} from "../types";

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  showSettings: false,

  addNode: (node: FlowNode) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  updateNode: (nodeId: string, data: Partial<TextNodeData>) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },

  setNodes: (nodes: FlowNode[]) => {
    set({ nodes });
  },

  setEdges: (edges: FlowEdge[]) => {
    set({ edges });
  },

  setSelectedNode: (node: FlowNode | null) => {
    set({
      selectedNode: node,
      showSettings: node !== null,
    });
  },

  setShowSettings: (show: boolean) => {
    set({ showSettings: show });
  },

  validateFlow: () => {
    const { nodes, edges } = get();

    // If there's only one node or no nodes, it's valid
    if (nodes.length <= 1) {
      return { isValid: true };
    }

    // Check for nodes with empty target handles (no incoming edges)
    const nodesWithoutTargets = nodes.filter((node) => {
      const hasIncomingEdge = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdge;
    });

    // If more than one node has no incoming edges, it's invalid
    if (nodesWithoutTargets.length > 1) {
      return {
        isValid: false,
        error: "More than one node has empty target handles",
      };
    }

    return { isValid: true };
  },
}));
