"use client";

import { useState, useEffect } from "react";
import LocationInput from "./components/LocationInput";
import ActionButton from "./components/ActionButton";

interface locationItem {
    index: number;
    location: string;
}
function LocationInputList() {
	const [locations, useLocations] = useState<locationItem[]>([
        {
            index: 0,
            location: ""
        },
        {
            index: 1,
            location: ""
        }
    ]);
	const [newLocationAddable, useNewLocationAddable] = useState(false);

    useEffect(() => {
        setNewLocationAddable();
    }, [locations])

    function setNewLocationAddable() {
        useNewLocationAddable(locations.length < 5 && locations.every(item => item.location.trim() !== ""));
    }

	function handleLocationChange({ index }: { index: number }, { input }: { input: React.ChangeEvent<HTMLInputElement> }) {
        const updatedLocations = [...locations];
        updatedLocations[index].location = input.target.value;
        useLocations(updatedLocations);
	}

	function handleLocationDelete({ index }: { index: number }) {
        useLocations([...locations.filter((_, i) => i !== index)].map((item, i) => ({ index: i, location: item.location })));
	}

	function handleAddLocation() {
		if (locations.length >= 5) {
			return;
		} else {
			useNewLocationAddable(false);
			useLocations([
                ...locations, 
                {
                    index: locations.length,
                    location: ""
                }
            ]);
		}
	}

	return (
		<div>
			{locations.map((item, i, arr) => {
				const label = `Location ${i + 1}${i === 0 ? " (Pick Up)" : i === arr.length -1 ?" (Drop Off)" : ""}`;
				return (
					<LocationInput 
						key={i}
						name="location" 
						label={label} 
						value={item.location} 
						deletable={arr.length > 2} 
						onInputChange={(input: React.ChangeEvent<HTMLInputElement>) => handleLocationChange({ index: i }, { input })}
						onLocationDelete={() => handleLocationDelete({ index: i })}
					></LocationInput>
				)
			})}
			<ActionButton
				onClick={handleAddLocation}
				label="Add Location"
				disabled={!newLocationAddable}
                className="mt-4"
			/>
		</div>
	)
}

export default function Home() {
  return (
    <div>
		<LocationInputList />
	</div>
  );
}
