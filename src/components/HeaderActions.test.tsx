import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeaderActions from "./HeaderActions";
import { useFlowStore } from "../store/useStore";

describe("HeaderActions", () => {
  it("should render the save and clear buttons", () => {
    render(<HeaderActions />);
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("should call the validateFlow and show a success message when the flow is valid", () => {
    const validateFlow = vi.fn(() => ({ isValid: true }));
    useFlowStore.setState({ validateFlow });

    render(<HeaderActions />);
    fireEvent.click(screen.getByText("Save Changes"));

    expect(validateFlow).toHaveBeenCalled();
  });

  it("should call the validateFlow and show an error message when the flow is invalid", () => {
    const validateFlow = vi.fn(() => ({ isValid: false, error: "Error" }));
    useFlowStore.setState({ validateFlow });

    render(<HeaderActions />);
    fireEvent.click(screen.getByText("Save Changes"));

    expect(validateFlow).toHaveBeenCalled();
  });

  it("should show a confirmation dialog when the clear button is clicked", () => {
    render(<HeaderActions />);
    fireEvent.click(screen.getByText("Clear All"));

    expect(screen.getByText("Are you sure you want to clear the flow?")).toBeInTheDocument();
  });
});
