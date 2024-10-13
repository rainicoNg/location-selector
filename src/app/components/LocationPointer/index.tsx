import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/app/components/Icon";

interface LocationPointerProps {
  lat: number;
  lng: number;
  index: number;
}

export default function LocationPointer({ ...props }: LocationPointerProps) {
  return (
    <AdvancedMarker position={{lat: props.lat, lng: props.lng}} className="location-pointer">
      <span className="fa-layers fa-fw">
        <Icon type={faLocationPin} size="3x" className="text-dark" />
        <span className="fa-layers-text text-primary text-base font-bold mx-1.5 pb-1.5">
          {props.index}
        </span>
      </span>
    </AdvancedMarker>
  );
}
