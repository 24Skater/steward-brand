import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Breadcrumb } from "../components/Breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Members", href: "/members" },
  { label: "John Doe" },
];

describe("Breadcrumb", () => {
  it("renders all items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders linked items as anchors", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Members" })).toHaveAttribute("href", "/members");
  });

  it("renders the last item with aria-current=page", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("John Doe")).toHaveAttribute("aria-current", "page");
  });

  it("does not render the last item as a link", () => {
    render(<Breadcrumb items={items} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  it("renders the nav with aria-label", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("renders a single-item breadcrumb without a separator", () => {
    render(<Breadcrumb items={[{ label: "Home" }]} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
