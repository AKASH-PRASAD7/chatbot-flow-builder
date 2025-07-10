import React, { useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type OnSelectionChangeParams,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TextNode from "./nodes/TextNode";
import { useFlowStore } from "../store/useStore";
import { type FlowNode, type FlowEdge } from "../types";

/**
 * Custom node types configuration
 * This makes it easy to add new node types in the future
 */
const nodeTypes = {
  textNode: TextNode,
};

const FlowBuilder: React.FC = () => {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    addNode,
    setNodes,
    setEdges,
    setSelectedNode,
  } = useFlowStore();

  // Convert store nodes/edges to React Flow format
  const [nodes, setNodesState, onNodesChange] = useNodesState([]);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState([]);

  // Ref to track if we're updating from store
  const isUpdatingFromStore = useRef(false);

  /**
   * Handle new connections between nodes
   * Validates that source handles can only have one outgoing edge
   */
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has an edge
      const existingEdge = edges.find(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      let updatedEdges = edges;

      if (existingEdge) {
        // Remove existing edge from source handle
        updatedEdges = edges.filter((edge) => edge.id !== existingEdge.id);
      }

      // Add new edge
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
      } as Edge;

      updatedEdges = addEdge(newEdge, updatedEdges);
      setEdgesState(updatedEdges);
      setEdges(updatedEdges);
    },
    [edges, setEdgesState, setEdges]
  );

  /**
   * Handle node changes (position, selection, etc.)
   */
  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);

      // Update store with new node positions but preserve data
      if (!isUpdatingFromStore.current) {
        setNodesState((current) => {
          const updatedNodes = current.map((node) => ({
            ...node,
            data:
              storeNodes.find((storeNode) => storeNode.id === node.id)?.data ||
              node.data,
          }));
          setNodes(updatedNodes);
          return updatedNodes;
        });
      }
    },
    [onNodesChange, setNodes, storeNodes]
  );

  /**
   * Handle edge changes
   */
  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChange(changes);

      // Update store with edge changes
      if (!isUpdatingFromStore.current) {
        setEdgesState((current) => {
          setEdges(current);
          return current;
        });
      }
    },
    [onEdgesChange, setEdges]
  );

  /**
   * Handle drag over event for node dropping
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handle drop event to create new nodes
   */
  const { screenToFlowPosition } = useReactFlow();
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create new node
      const newNode: FlowNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: {
          id: `node-${Date.now()}`,
          text: "",
          label: "Text Node",
        },
      };

      // Add node to store
      addNode(newNode);
    },
    [addNode]
  );

  /**
   * Handle node selection changes
   */
  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      const selectedNode = params.nodes[0] as FlowNode;
      setSelectedNode(selectedNode || null);
    },
    [setSelectedNode]
  );

  /**
   * Sync store changes with React Flow state
   * Only sync when store actually changes, not on every render
   */
  React.useEffect(() => {
    isUpdatingFromStore.current = true;

    // Only update if there's a real difference
    const nodesChanged = JSON.stringify(nodes) !== JSON.stringify(storeNodes);
    if (nodesChanged) {
      setNodesState(storeNodes);
    }

    setTimeout(() => {
      isUpdatingFromStore.current = false;
    }, 0);
  }, [storeNodes]);

  React.useEffect(() => {
    isUpdatingFromStore.current = true;

    // Only update if there's a real difference
    const edgesChanged = JSON.stringify(edges) !== JSON.stringify(storeEdges);
    if (edgesChanged) {
      setEdgesState(storeEdges);
    }

    setTimeout(() => {
      isUpdatingFromStore.current = false;
    }, 0);
  }, [storeEdges]);

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background />
        <Controls />
        <MiniMap
          className="bg-white"
          nodeColor={(node) => {
            return node.type === "textNode" ? "#3B82F6" : "#6B7280";
          }}
        />
      </ReactFlow>
    </div>
  );
};

// Wrap with ReactFlowProvider for context
const FlowBuilderWithProvider: React.FC = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);

export default FlowBuilderWithProvider;
