import LocationInput from "@/app/components/LocationInput";
import { LocationItem } from "@/app/reducer/useLocations";

interface LocationInputListProps {
  locations: LocationItem[];
  handleLocationChange: (
    index: number,
    input: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLocationDelete: (index: number) => void;
  disabled: boolean;
  className?: string;
}

export default function LocationInputList({ ...props }: LocationInputListProps) {
  return (
    <div className={props.className}>
      {props.locations.map((item, i, arr) => {
        const label = `Location ${i + 1}${
          i === 0 ? " (Pick Up)" : i === arr.length - 1 ? " (Drop Off)" : ""
        }`;
        return (
          <LocationInput
            key={i}
            name={`location_${i}`}
            label={label}
            value={item.location}
            disabled={props.disabled}
            deletable={item.location !== ""}
            onInputChange={(input: React.ChangeEvent<HTMLInputElement>) =>
              props.handleLocationChange(i, input)
            }
            onLocationDelete={() => props.handleLocationDelete(i)}
            className={`${i !== arr.length - 1 ? "mb-2" : ""}`}
          ></LocationInput>
        );
      })}
    </div>
  );
}
