import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);
    const heading = screen.getByText("Location Selector");
    expect(heading).toBeInTheDocument();
  });

  it("displays correct init value for location input", () => {
    const { container } = render(<Page />);
    const locationInputs = container.querySelectorAll("div.location-input");
    for (let i = 0; i < locationInputs.length; i++) {
      const label = locationInputs[i].querySelector("label")?.textContent;
      const input = locationInputs[i].querySelector("input");
      expect(label).toBe(`Location ${i + 1} ${i === 0 ? "(Pick Up)" : i === locationInputs.length - 1 ? "(Drop Off)" : ""}`);
      expect(input).toHaveValue("");
    }
  });

  it ("location input disable and enable correctly", () => {
    const { container } = render(<Page />);
    const locationInput = container.querySelector("div.location-input");
    const deleteBtn = locationInput?.querySelector("button");
    expect(deleteBtn).toBeDisabled();

    const input = locationInput?.querySelector("input")!;

    fireEvent.change(input, { target: { value: "test" } });
    expect(deleteBtn).not.toBeDisabled();

    fireEvent.change(input, { target: { value: "   " } });
    expect(deleteBtn).not.toBeDisabled();

    fireEvent.change(input, { target: { value: "" } });
    expect(deleteBtn).toBeDisabled();
  });

  it ("clear location input when clear btn is clicked", () => {
    const { container } = render(<Page />);
    const clearBtn = container.querySelector(".action-button.clear");

    const locationInputs = container.querySelectorAll("div.location-input");
    for (let i = 0; i < locationInputs.length; i++) {
      const input = locationInputs[i].querySelector("input")!;
      fireEvent.change(input, { target: { value: "test" } });
      expect(input).toHaveValue("test");
    }
    fireEvent.click(clearBtn!);
    for (let i = 0; i < locationInputs.length; i++) {
      const input = locationInputs[i].querySelector("input")!;
      expect(input).toHaveValue("");
    }
  });
})