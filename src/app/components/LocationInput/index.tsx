"use client";

import IconButton from "../IconButton";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

interface ILocationInputProps {
  name: string;
  label: string;
  deletable: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationDelete: () => void;
  value?: string;
  className?: string;
}

export default function LocationInput({...props}: ILocationInputProps) {
  return (
    <div className={props.className}>
      <label className="font-semibold">{props.label}</label>
      <div className="w-full flex relative">
        <IconButton
          onClick={props.onLocationDelete}
          icon={faTrash}
          disabled={!props.deletable}
          className="text-negative absolute inset-y-0 right-0"
        />
        <input
          type="text"
          name={props.name}
          value={props.value || ""}
          onChange={props.onInputChange}
          className="border border-gray-400 rounded grow py-1 pl-2 pr-6"
        />
      </div>
    </div>
  );
}
