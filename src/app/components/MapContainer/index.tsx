import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import LocationPointer from "../LocationPointer";

function Routes({wayPoints}: {wayPoints: google.maps.LatLngLiteral[]}) {
  const map = useMap();
  const routeLib = useMapsLibrary("routes");
  const [dirService, useDirService] = useState<google.maps.DirectionsService>();
  const [dirRenderer, useDirRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routeLib || !map) return;
      useDirService(new routeLib.DirectionsService());
      useDirRenderer(new routeLib.DirectionsRenderer({ map, suppressMarkers: true }));
  }, [routeLib, map]);

  useEffect(() => {
    if (!dirService || !dirRenderer) return;
    if (wayPoints && wayPoints.length > 2) {
      // set map if not set
      if (dirRenderer.getMap() === null && map){
        dirRenderer.setMap(map);
      }
      // draw driving route
      dirService.route({
        origin: wayPoints[0],
        destination: wayPoints[wayPoints.length - 1],
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
        waypoints: wayPoints.map(r => ({location: r})),
      }).then(res => {
        dirRenderer.setDirections(res);
      }).catch((e) => {
        console.error(e);
      });
    } else {
      // clear route if no way points
      dirRenderer.setMap(null);
    }
  }, [wayPoints]);
  return <></>;
}

interface IMapContainerProps {
  path?: string[][];
  className?: string;
}

export default function MapContainer({...props}: IMapContainerProps) {
  const [paths, usePaths] = useState<google.maps.LatLngLiteral[]>([]);

  useEffect(() => {
    if (props.path) {
      usePaths(props.path.map(p => ({
        lat: Number.parseFloat(p[0]),
        lng: Number.parseFloat(p[1])
      })).filter(p => !(Number.isNaN(p.lat) || Number.isNaN(p.lng))));
    } else {
      usePaths([]);
    }
  }, [props.path]);

  return (
    <div className={props.className}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          style={{width: "100%", height: "100%"}}
          defaultCenter={{lat: 22.33560, lng: 114.17611}}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          <Routes wayPoints={paths}/>
          {paths && paths.length > 0 && paths.map((p, i) => 
            (
              <LocationPointer 
                key={i} 
                lat={p.lat} 
                lng={p.lng} 
                index={i+1} 
              />
            )
          )}
        </Map>
      </APIProvider>
    </div>
  );
}