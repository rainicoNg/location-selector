import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Icon from "@/app/components/Icon";

interface IconButtonProps {
  onClick: () => void;
  icon: IconDefinition;
  disabled: boolean;
  className?: string;
}

export default function IconButton({ ...props }: IconButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`bg-transparent text-dark rounded-full disabled:text-disabled ${props.className}`}
    >
      <Icon type={props.icon} />
    </button>
  );
}
