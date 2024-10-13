import { faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/app/components/IconButton";

interface LocationInputProps {
  name: string;
  label: string;
  disabled: boolean;
  deletable: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationDelete: () => void;
  value?: string;
  className?: string;
}

export default function LocationInput({ ...props }: LocationInputProps) {  
  return (
    <div className={`location-input ${props.className}`}>
      <label className="font-semibold">{props.label}</label>
      <div className="relative w-full flex" data-testid={`LocationInput-${props.name}`}>
        <IconButton
          onClick={props.onLocationDelete}
          icon={faTrash}
          disabled={!props.deletable || props.disabled}
          className="absolute inset-y-0 right-0 text-negative hover:text-red-600"
        />
        <input
          type="text"
          name={props.name}
          value={props.value || ""}
          disabled={props.disabled}
          onChange={props.onInputChange}
          className="border border-gray-400 rounded py-1 pl-2 pr-6 grow dark:text-background"
        />
      </div>
    </div>
  );
}
