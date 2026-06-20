import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "../components/Pagination";

describe("Pagination", () => {
  it("renders prev/next buttons and page numbers", () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination totalPages={5} currentPage={2} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Go to page 2")).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("Go to page 1")).not.toHaveAttribute("aria-current");
  });

  it("disables prev button on first page", () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
    expect(screen.getByLabelText("Go to next page")).not.toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText("Go to next page")).toBeDisabled();
    expect(screen.getByLabelText("Go to previous page")).not.toBeDisabled();
  });

  it("calls onPageChange with correct page when a page button is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByLabelText("Go to page 1"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange(prev) when prev button is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByLabelText("Go to previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange(next) when next button is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByLabelText("Go to next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("shows ellipsis for large page counts", () => {
    render(<Pagination totalPages={20} currentPage={10} onPageChange={vi.fn()} />);
    const ellipses = screen.getAllByRole("navigation")[0].querySelectorAll("span");
    expect(ellipses.length).toBeGreaterThan(0);
  });
});
