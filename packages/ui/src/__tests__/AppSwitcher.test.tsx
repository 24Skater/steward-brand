import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { AppSwitcher, type AppSwitcherApp } from "../components/AppSwitcher";

const apps: AppSwitcherApp[] = [
  { key: "chms", name: "Congregation", href: "https://grace-stewardchms.example.org" },
  { key: "table", name: "Table", href: "https://grace-stewardtable.example.org" },
  {
    key: "vbs",
    name: "VBS",
    href: "https://grace-stewardvbs.example.org",
    access: "read-only",
  },
];

const congregation = apps[0] as AppSwitcherApp;

const open = async () => {
  await userEvent.click(screen.getByRole("button", { name: "Switch application" }));
};

describe("AppSwitcher", () => {
  it("names the current application on the trigger", () => {
    render(<AppSwitcher apps={apps} currentAppKey="table" />);
    expect(screen.getByRole("button", { name: "Switch application" })).toHaveTextContent("Table");
  });

  it("keeps the menu closed until asked", () => {
    render(<AppSwitcher apps={apps} currentAppKey="table" />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("links to the other applications by their own host", async () => {
    render(<AppSwitcher apps={apps} currentAppKey="table" />);
    await open();

    expect(screen.getByRole("menuitem", { name: /Congregation/ })).toHaveAttribute(
      "href",
      "https://grace-stewardchms.example.org"
    );
  });

  it("marks the current application rather than linking to it", async () => {
    render(<AppSwitcher apps={apps} currentAppKey="table" />);
    await open();

    const current = screen.getByRole("menuitem", { name: /Table/ });
    expect(current).toHaveAttribute("aria-current", "true");
    expect(current).not.toHaveAttribute("href");
  });

  it("still lets a read-only application be opened, and says so", async () => {
    // Read-only is exactly when a church most needs to get in — to export.
    render(<AppSwitcher apps={apps} currentAppKey="table" />);
    await open();

    const readOnly = screen.getByRole("menuitem", { name: /VBS/ });
    expect(readOnly).toHaveAttribute("href", "https://grace-stewardvbs.example.org");
    expect(readOnly).toHaveTextContent("Read only");
  });

  it("shows an ended application instead of hiding it", async () => {
    // An application that silently disappears reads as data loss.
    const ended: AppSwitcherApp[] = [
      ...apps.slice(0, 2),
      { key: "pos", name: "StewardPOS", href: "https://x.example.org", access: "ended" },
    ];
    render(<AppSwitcher apps={ended} currentAppKey="table" />);
    await open();

    const item = screen.getByRole("menuitem", { name: /StewardPOS/ });
    expect(item).toHaveTextContent("Subscription ended");
    expect(item).toHaveAttribute("aria-disabled", "true");
    expect(item).not.toHaveAttribute("href");
  });

  it("does not link to an application that was never subscribed to", async () => {
    const withOffer: AppSwitcherApp[] = [
      ...apps.slice(0, 2),
      { key: "pos", name: "StewardPOS", href: "https://x.example.org", access: "not-subscribed" },
    ];
    render(<AppSwitcher apps={withOffer} currentAppKey="table" />);
    await open();

    const item = screen.getByRole("menuitem", { name: /StewardPOS/ });
    expect(item).toHaveTextContent("Not subscribed");
    expect(item).not.toHaveAttribute("href");
  });

  it("offers the console when one is configured", async () => {
    render(
      <AppSwitcher
        apps={apps}
        currentAppKey="table"
        manageHref="https://app.example.org/dashboard"
      />
    );
    await open();

    expect(screen.getByRole("menuitem", { name: "Manage applications" })).toHaveAttribute(
      "href",
      "https://app.example.org/dashboard"
    );
  });

  it("renders nothing on a self-hosted install", () => {
    // One application and no console: the switcher would be a control that
    // does nothing, so it should not be a control at all.
    const { container } = render(<AppSwitcher apps={[congregation]} currentAppKey="chms" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("still renders for a single application when a console exists", () => {
    render(
      <AppSwitcher
        apps={[congregation]}
        currentAppKey="chms"
        manageHref="https://app.example.org"
      />
    );
    expect(screen.getByRole("button", { name: "Switch application" })).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    render(<AppSwitcher apps={apps} currentAppKey="table" />);
    await open();
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Switch application" })).toHaveFocus();
  });

  it("closes when a click lands outside it", async () => {
    render(
      <div>
        <AppSwitcher apps={apps} currentAppKey="table" />
        <button type="button">Elsewhere</button>
      </div>
    );
    await open();

    await userEvent.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("falls back to the label when the current application is not in the list", () => {
    // A church opening an application it is not entitled to should still get a
    // usable switcher rather than a blank trigger.
    render(<AppSwitcher apps={apps} currentAppKey="nope" />);
    expect(screen.getByRole("button", { name: "Switch application" })).toHaveTextContent(
      "Switch application"
    );
  });
});
