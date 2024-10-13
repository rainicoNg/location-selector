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
      className={`action-button bg-primary text-dark disabled:bg-disabled hover:bg-primary-hover ${props.className}`}
    >
      <label>{props.label}</label>
    </button>
  );
}
