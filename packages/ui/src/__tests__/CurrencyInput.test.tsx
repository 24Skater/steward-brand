import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CurrencyInput } from "../components/CurrencyInput";

describe("CurrencyInput", () => {
  it("renders the currency symbol prefix", () => {
    render(<CurrencyInput value={0} />);
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders a custom symbol", () => {
    render(<CurrencyInput value={0} symbol="€" />);
    expect(screen.getByText("€")).toBeInTheDocument();
  });

  it("displays formatted value when not focused", () => {
    render(<CurrencyInput value={1234.5} />);
    expect(screen.getByRole("textbox")).toHaveValue("1,234.50");
  });

  it("switches to raw string on focus and restores on blur", async () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={100} onChange={onChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    expect(input).toHaveValue("100");

    await userEvent.clear(input);
    await userEvent.type(input, "250");
    await userEvent.tab();

    expect(onChange).toHaveBeenCalledWith(250);
  });

  it("calls onChange with 0 when input is cleared", async () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={50} onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.tab();
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("respects custom decimals", () => {
    render(<CurrencyInput value={1.5} decimals={0} />);
    expect(screen.getByRole("textbox")).toHaveValue("2");
  });

  it("is disabled when the disabled prop is set", () => {
    render(<CurrencyInput value={0} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("ignores non-numeric characters typed by the user", async () => {
    render(<CurrencyInput value={0} />);
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.type(input, "abc12.5xyz");
    expect(input).toHaveValue("12.5");
  });
});
