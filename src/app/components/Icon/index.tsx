import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Icon({type}: {type: IconDefinition}) {
  return <FontAwesomeIcon icon={type} />;
}
