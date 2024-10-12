import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap
} from "@vis.gl/react-google-maps";
import LocationPointer from "@/app/components/LocationPointer";

function Routes({ wayPoints }: { wayPoints: google.maps.LatLngLiteral[] }) {
  const map = useMap();
  const routeLib = useMapsLibrary("routes");
  const [dirService, setDirService] = useState<google.maps.DirectionsService>();
  const [dirRenderer, setDirRenderer] =
    useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routeLib || !map) return;

    const service = new routeLib.DirectionsService();
    const renderer = new routeLib.DirectionsRenderer({ map, suppressMarkers: true });
    setDirService(service);
    setDirRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routeLib, map]);

  useEffect(() => {
    if (!dirService || !dirRenderer) return;
    if (wayPoints && wayPoints.length > 2) {
      // set map if not set
      if (dirRenderer.getMap() === null && map) {
        dirRenderer.setMap(map);
      }
      // draw driving route
      dirService
        .route({
          origin: wayPoints[0],
          destination: wayPoints[wayPoints.length - 1],
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: false,
          waypoints: wayPoints.map((r) => ({location: r}))
        })
        .then((res) => {
          dirRenderer.setDirections(res);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      // clear route if no way points
      dirRenderer.setMap(null);
    }
  }, [wayPoints, dirService, dirRenderer, map]);
  return <div id="mapRout" />;
}

interface MapContainerProps {
  path?: string[][];
  className?: string;
}

export default function MapContainer({ ...props }: MapContainerProps) {
  const [paths, setPaths] = useState<google.maps.LatLngLiteral[]>([]);

  useEffect(() => {
    if (props.path) {
      setPaths(
        props.path
          .map((p) => ({
            lat: Number.parseFloat(p[0]),
            lng: Number.parseFloat(p[1])
          }))
          .filter((p) => !(Number.isNaN(p.lat) || Number.isNaN(p.lng)))
      );
    } else {
      setPaths([]);
    }
  }, [props.path]);

  return (
    <div className={props.className}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          style={{width: "100%", height: "100%"}}
          defaultCenter={{lat: 22.3356, lng: 114.17611}}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          <Routes wayPoints={paths} />
          {paths &&
            paths.length > 0 &&
            paths.map((p, i) => (
              <LocationPointer key={i} lat={p.lat} lng={p.lng} index={i + 1} />
            ))}
        </Map>
      </APIProvider>
    </div>
  );
}
