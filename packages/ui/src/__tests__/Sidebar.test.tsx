import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarSectionTitle,
  SidebarLink,
  SidebarSeparator,
} from "../components/Sidebar";

describe("Sidebar", () => {
  it("renders as an aside", () => {
    render(<Sidebar>nav</Sidebar>);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Sidebar>
        <SidebarHeader>Logo</SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarSectionTitle>Ministry</SidebarSectionTitle>
            <SidebarLink href="/dashboard">Dashboard</SidebarLink>
            <SidebarLink href="/members" active>Members</SidebarLink>
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
    );
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Ministry")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("SidebarLink", () => {
  it("renders as an anchor with href", () => {
    render(<SidebarLink href="/dashboard">Dashboard</SidebarLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/dashboard");
  });

  it("sets aria-current=page when active", () => {
    render(<SidebarLink href="/members" active>Members</SidebarLink>);
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current when not active", () => {
    render(<SidebarLink href="/dashboard">Dashboard</SidebarLink>);
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
  });

  it("renders an icon when provided", () => {
    render(
      <SidebarLink href="/" icon={<svg data-testid="icon" />}>
        Home
      </SidebarLink>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});

describe("SidebarSeparator", () => {
  it("renders with separator role", () => {
    render(<SidebarSeparator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
