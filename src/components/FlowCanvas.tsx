import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  OnConnect,
  useReactFlow,
} from "reactflow";
import TextNode from "../custom-nodes/TextNode";
import { v4 as uuidv4 } from "uuid";

const nodeTypes: NodeTypes = { textNode: TextNode };

export default function FlowCanvas({
  setSelectedNode,
}: {
  setSelectedNode: (node: Node | null) => void;
}) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const isSourceUsed = edges.some((e) => e.source === params.source);
      if (!isSourceUsed) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        alert("Only one edge allowed from source handle");
      }
    },
    [edges]
  );

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = { x: event.clientX - 250, y: event.clientY };

    const newNode: Node = {
      id: uuidv4(),
      type,
      position,
      data: { label: "Text Message" },
    };
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleSave = () => {
    if (nodes.length <= 1) return alert("Add more than one node to save.");

    const nodesWithNoOutgoing = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );

    if (nodesWithNoOutgoing.length > 1) {
      alert("Only one node can have no outgoing edge.");
      return;
    }

    const flow = { nodes, edges };
    console.log("Saved Flow:", flow);
    alert("Flow saved successfully. Check console for data.");
  };

  return (
    <div className="h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          Save Flow
        </button>
      </div>
    </div>
  );
}
