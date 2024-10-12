import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/app/components/Icon";

interface ILocationPointerProps {
  lat: number;
  lng: number;
  index: number;
}

export default function LocationPointer({...props}: ILocationPointerProps) {
  return (
    <AdvancedMarker
      position={{lat: props.lat, lng: props.lng}}
    >
      <span className="fa-layers fa-fw">
        <Icon 
          type={faLocationPin} 
          size="3x"
          className="text-dark"
        />
        <span className="fa-layers-text text-primary mx-1.5 pb-1.5 text-base font-bold" >{props.index}</span>
      </span>
    </AdvancedMarker>
  );
}
