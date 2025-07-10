import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type FlowState,
  type FlowNode,
  type FlowEdge,
  type TextNodeData,
} from "../types";

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNode: null,
      showSettings: false,

      addNode: (node: FlowNode) => {
        set((state) => ({ nodes: [...state.nodes, node] }));
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
            node.id === nodeId
              ? { ...node, data: { ...node.data, ...data } }
              : node
          ),
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
          const updatedNodes = nodes.map((node) => {
            const existingNode = state.nodes.find((n) => n.id === node.id);
            return existingNode ? { ...node, data: existingNode.data } : node;
          });
          return { nodes: updatedNodes };
        });
      },

      setEdges: (edges: FlowEdge[]) => {
        set({ edges });
      },

      setSelectedNode: (node: FlowNode | null) => {
        set({ selectedNode: node, showSettings: node !== null });
      },

      setShowSettings: (show: boolean) => {
        set({ showSettings: show, selectedNode: show ? get().selectedNode : null });
      },

      validateFlow: () => {
        const { nodes, edges } = get();
        if (nodes.length <= 1) return { isValid: true };

        const nodesWithoutTargets = nodes.filter(
          (node) => !edges.some((edge) => edge.target === node.id)
        );

        if (nodesWithoutTargets.length > 1) {
          return {
            isValid: false,
            error: "More than one node has empty target handles",
          };
        }

        return { isValid: true };
      },

      clearAll: () => {
        set({
          nodes: [],
          edges: [],
          selectedNode: null,
          showSettings: false,
        });
      },
    }),
    {
      name: "chatbot-flow-storage", // unique name
    }
  )
);
