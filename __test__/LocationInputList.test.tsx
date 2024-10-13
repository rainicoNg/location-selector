import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LocationInputList from "@/app/components/LocationInputList";

describe("LocationInputList", () => {
  const initialValue = [
    {
      index: 0,
      location: ""
    },
    {
      index: 1,
      location: ""
    }
  ];
  const handleLocationChangeMock = jest.fn();
  const handleLocationDeleteMock = jest.fn();
  

  it ("displays correct initial label and value", () => {
    const { container } = render(
      <LocationInputList 
        locations={initialValue} 
        handleLocationChange={handleLocationChangeMock} 
        handleLocationDelete={handleLocationDeleteMock} 
        disabled={false} 
      />
    );

    const locationInputs = container.querySelectorAll("div.location-input");
    for (let i = 0; i < locationInputs.length; i++) {
      const label = locationInputs[i].querySelector("label")?.textContent;
      const input = locationInputs[i].querySelector("input");
      expect(label).toBe(`Location ${i + 1} ${i === 0 ? "(Pick Up)" : i === locationInputs.length - 1 ? "(Drop Off)" : ""}`);
      expect(input).toHaveValue("");
    }
  });

  it ("disables all input when disabled", () => {
    const { container } = render(
      <LocationInputList 
        locations={initialValue} 
        handleLocationChange={handleLocationChangeMock} 
        handleLocationDelete={handleLocationDeleteMock} 
        disabled 
      />
    );

    const locationInputs = container.querySelectorAll("div.location-input");
    for (let i = 0; i < locationInputs.length; i++) {
      const input = locationInputs[i].querySelector("input");
      const button = locationInputs[i].querySelector("button");
      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    }
  });
});