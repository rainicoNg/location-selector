import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

interface IIconButtonProps {
  onClick: () => void;
  icon: IconDefinition;
  disabled: boolean;
  className?: string;
}

export default function IconButton({...props}: IIconButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className} text-dark rounded-full bg-transparent disabled:text-disabled`}
    >
      <Icon type={props.icon} />
    </button>
  );
}
