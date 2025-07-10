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

  deleteNode: (nodeId: string) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode:
        state.selectedNode?.id === nodeId ? null : state.selectedNode,
    }));
  },

  updateNode: (nodeId: string, data: Partial<TextNodeData>) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
      // Update selectedNode if it's the one being updated
      selectedNode:
        state.selectedNode?.id === nodeId
          ? {
              ...state.selectedNode,
              data: { ...state.selectedNode.data, ...data },
            }
          : state.selectedNode,
    }));
  },

  setNodes: (nodes: FlowNode[]) => {
    set((state) => {
      // Preserve existing node data when updating positions
      const updatedNodes = nodes.map((node) => {
        const existingNode = state.nodes.find((n) => n.id === node.id);
        return existingNode ? { ...node, data: existingNode.data } : node;
      });

      return {
        nodes: updatedNodes,
        // Update selectedNode if it exists in the new nodes
        selectedNode: state.selectedNode
          ? updatedNodes.find((n) => n.id === state.selectedNode!.id) || null
          : null,
      };
    });
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
    set({
      showSettings: show,
      selectedNode: show ? get().selectedNode : null,
    });
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
