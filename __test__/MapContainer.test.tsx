import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { initialize } from "@googlemaps/jest-mocks";

import MapContainer from "@/app/components/MapContainer";

beforeEach(() => {
  initialize();
  global.google = {
    maps: {
      TravelMode: {
        DRIVING: 'DRIVING',
        BICYCLING: 'BICYCLING',
        TRANSIT: 'TRANSIT',
        WALKING: 'WALKING'
      }
    }
  } as typeof google;
});

describe("MapContainer", () => {
  const pathData = [
    [],
    [
      ["22.372081", "114.107877"],
      ["22.326442", "114.167811"],
      ["22.284419", "114.159510"]
    ],
    [
      ["22.337232550952", "114.1727092165061"],
      ["22.34182289644873", "114.17986999386686"],
      ["22.4238794300859", "114.20667850994673"],
      ["22.341528623276442", "114.26318421376702"],
      ["22.283054785661843", "114.13628458847225"]
    ]
  ];

  it("display correct location pointer count", () => {
    for (const pathDatum of pathData) {
      const { container } = render(<MapContainer path={pathDatum} />);

      const mapContainer = container.querySelector(".map-container");
      const locationPointers = mapContainer?.querySelectorAll(".location-pointer");

      expect(locationPointers?.length).toBe(pathDatum.length);
      }
  });
})