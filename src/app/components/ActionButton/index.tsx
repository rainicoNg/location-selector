interface IActionButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
  className?: string;
}

export default function ActionButton({...props}: IActionButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`bg-primary text-dark disabled:bg-disabled ${props.className}`}
    >
      <label>{props.label}</label>
    </button>
  );
}
