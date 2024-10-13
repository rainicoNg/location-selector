import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LocationPointer from "@/app/components/LocationPointer";

describe("LocationPointer", () => {
  it("location is correct", () => {
    render(<LocationPointer lat={22.34182289644873} lng={114.17986999386686} index={1} />);
    
    const locationPointer = screen.getByTestId("advanced-marker");

    expect(locationPointer).toHaveAttribute("data-lat", "22.34182289644873");
    expect(locationPointer).toHaveAttribute("data-lng", "114.17986999386686");
  });
});
