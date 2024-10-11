import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface IMapContainerProps {
  path?: string[][];
  className?: string;
}
export default function MapContainer({...props}: IMapContainerProps) {
  const [paths, usePaths] = useState<string[][]>([]);
  const [center, useCenter] = useState({lat: 22.33560, lng: 114.17611});
  const [zoom, useZoom] = useState(10);

  useEffect(() => {
    if (props.path && props.path.length > 0) {
      usePaths(props.path.filter(p => !(Number.isNaN(Number.parseFloat(p[0])) && Number.isNaN(Number.parseFloat(p[1])))));
    }
  }, [props.path])

  useEffect(() => {
    if (paths.length > 0) {
      const lat = paths.reduce((acc, cur) => acc + Number.parseFloat(cur[0]), 0) / paths.length;
      const lng = paths.reduce((acc, cur) => acc + Number.parseFloat(cur[1]), 0) / paths.length;
      useCenter({lat, lng});
      useZoom(12);
    }
  }, [paths])

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
      <Map
        style={{width: "100vw", height: "100vh"}}
        center={center}
        zoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        className={props.className}
      >
        {paths && paths.length > 0 && paths.map((p, i) => 
          (
            // TODO: use custom pointer
            <Marker
              position={{lat: Number.parseFloat(p[0]), lng: Number.parseFloat(p[1])}}
            />
          )
        )}
      </Map>
    </APIProvider>
  );
}