interface ActionButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
  className?: string;
}

export default function ActionButton({ ...props }: ActionButtonProps) {
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
