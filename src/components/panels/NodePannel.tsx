import type { NodeConfig } from "../../types";

const NodesPanel = () => {
  // Extensible nodes configuration - easy to add new node types
  const availableNodes: NodeConfig[] = [
    { type: "textNode", label: "Message", icon: "💬" },
    // Future nodes can be added here:
    // { type: 'imageNode', label: 'Image', icon: '🖼️' },
    // { type: 'buttonNode', label: 'Button', icon: '🔘' },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Nodes Panel</h3>
      <div className="space-y-3">
        {availableNodes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;
