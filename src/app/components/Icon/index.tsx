import {IconDefinition, SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IIconProps {
  type: IconDefinition;
  size?: SizeProp;
  className?: string;
  spin?: boolean;
}
export default function Icon({...props}: IIconProps) {
  return <FontAwesomeIcon 
      icon={props.type} 
      size={props.size || "sm"} 
      className={props.className}
      spin={props.spin}
    />;
}
