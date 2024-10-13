import React from "react";

export function AdvancedMarker({ position, ...props }: { position : { lat: number, lng: number } }) {
  return <div {...props} data-lat={position.lat} data-lng={position.lng} data-testid="advanced-marker"></div>
}


export function Map({ children }: { children: React.ReactNode }) {
  return <div data-testid="map">{children}</div>
}

export function APIProvider({ children }: { children: React.ReactNode }) {
  return <div data-testid="api-provider">{children}</div>
}

export function useMap() {
  return { };
}

export function useMapsLibrary() {
  return {
    DirectionsService: class {
      route = jest.fn().mockResolvedValue({ routes: [] });
    },
    DirectionsRenderer: class {
      setMap = jest.fn();
      setDirections = jest.fn();
      getMap = jest.fn().mockReturnValue(null);
    }
  };
}