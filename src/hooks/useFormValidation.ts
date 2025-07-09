import { useCallback } from "react";
import { Node, Edge } from "@xyflow/react";
import { FlowValidation } from "../types";

export const useFlowValidation = (
  getNodes: () => Node[],
  getEdges: () => Edge[]
) => {
  const validateFlow = useCallback((): FlowValidation => {
    const nodes = getNodes();
    const edges = getEdges();
    const errors: string[] = [];

    if (nodes.length > 1) {
      const nodesWithoutIncomingEdges = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
      });

      if (nodesWithoutIncomingEdges.length > 1) {
        errors.push("More than one node has empty target handles.");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [getNodes, getEdges]);

  return { validateFlow };
};
