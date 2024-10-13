import React from 'react';

const LocationPointer = ({ lat, lng, index }: { lat: number, lng: number, index: number }) => {
  return <div className="location-pointer" data-lat={lat} data-lng={lng} data-testid={`location-pointer-${index}`} />;
};

export default LocationPointer;