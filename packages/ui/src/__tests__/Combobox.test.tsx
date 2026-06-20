import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Combobox, type ComboboxOption } from "../components/Combobox";

const options: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

describe("Combobox", () => {
  it("renders trigger with placeholder when no value is selected", () => {
    render(<Combobox options={options} placeholder="Pick a fruit" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a fruit");
  });

  it("renders trigger with selected label", () => {
    render(<Combobox options={options} value="banana" placeholder="Pick a fruit" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });

  it("opens dropdown on click", async () => {
    render(<Combobox options={options} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("closes dropdown after selecting an option", async () => {
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Apple"));
    expect(onChange).toHaveBeenCalledWith("apple");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  });

  it("filters options by search query", async () => {
    render(<Combobox options={options} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByRole("searchbox"), "an");
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  });

  it("shows empty message when no options match", async () => {
    render(<Combobox options={options} emptyMessage="Nothing found" />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("does not call onChange for disabled options", async () => {
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Disabled Option"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("deselects a value when clicking the already-selected option", async () => {
    const onChange = vi.fn();
    render(<Combobox options={options} value="apple" onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: /apple/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
