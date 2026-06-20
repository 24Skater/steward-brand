import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "../components/Spinner";

describe("Spinner", () => {
  it("renders with default aria-label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading…");
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Saving…" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Saving…");
  });

  it("applies size classes for each size variant", () => {
    const { rerender } = render(<Spinner size="xs" />);
    expect(screen.getByRole("status").className).toContain("size-3");

    rerender(<Spinner size="sm" />);
    expect(screen.getByRole("status").className).toContain("size-4");

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole("status").className).toContain("size-6");

    rerender(<Spinner size="xl" />);
    expect(screen.getByRole("status").className).toContain("size-8");
  });

  it("merges additional className", () => {
    render(<Spinner className="text-blue-500" />);
    expect(screen.getByRole("status").className).toContain("text-blue-500");
  });
});
