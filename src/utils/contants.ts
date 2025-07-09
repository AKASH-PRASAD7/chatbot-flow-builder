export const NODE_TYPES = {
  TEXT: "textNode",
  // Future node types
} as const;

export const VALIDATION_MESSAGES = {
  EMPTY_TARGET_HANDLES: "More than one node has empty target handles.",
  SAVE_SUCCESS: "Flow saved successfully!",
  CONNECTION_ERROR: "A source handle can only have one outgoing connection!",
} as const;

export const PANEL_WIDTH = 256;
