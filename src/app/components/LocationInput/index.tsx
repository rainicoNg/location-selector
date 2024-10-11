"use client";

import IconButton from "../IconButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ILocationInputProps {
	name: string;
	label: string;
	deletable: boolean;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onLocationDelete: () => void;
	value?: string;
}

export default function LocationInput({ ...props }: ILocationInputProps) {
	return (
		<div>
			<label>{props.label}</label>
			<div>
				<input 
					type="text" 
					name={props.name} 
                    value={props.value || ""}
					onChange={props.onInputChange}
					className="border border-gray-300 rounded"
				/>
				<IconButton 
					onClick={props.onLocationDelete} 
					icon={faTrash} 
					disabled={!props.deletable}
                    className="text-red-400"
				></IconButton>
			</div>
		</div>
	)
}