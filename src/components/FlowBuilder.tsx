import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type OnSelectionChangeParams,
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
  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges);

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

      if (existingEdge) {
        // Remove existing edge from source handle
        const newEdges = edges.filter((edge) => edge.id !== existingEdge.id);
        setEdgesState(newEdges);
        setEdges(newEdges);
      }

      // Add new edge
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
      } as Edge;

      const updatedEdges = addEdge(newEdge, edges);
      setEdgesState(updatedEdges);
      setEdges(updatedEdges);
    },
    [edges, setEdgesState, setEdges]
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
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      // Get the drop position
      const reactFlowBounds = (event.target as Element).getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

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

      // Add node to store and local state
      addNode(newNode);
      setNodesState((current) => [...current, newNode]);
    },
    [addNode, setNodesState]
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
   */
  React.useEffect(() => {
    setNodesState(storeNodes);
  }, [storeNodes, setNodesState]);

  React.useEffect(() => {
    setEdgesState(storeEdges);
  }, [storeEdges, setEdgesState]);

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
