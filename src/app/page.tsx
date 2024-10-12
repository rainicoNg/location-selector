"use client";

import {useState} from "react";
import axios from "axios";
import LocationInput from "./components/LocationInput";
import ActionButton from "./components/ActionButton";
import ResultContainer from "./components/ResultContainer";
import MapContainer from "./components/MapContainer";

export interface IPathDetails {
  status: "none" | "in-progress" | "success" |  "error";
  message: string;
  path?: string[][];
  totalDistance?: number;
  totalTime?: number;
}

export default function Home() {
  interface locationItem {
    index: number;
    location: string;
  }

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
  const [pathData, usePathData] = useState<IPathDetails>({
    status: "none",
    message: "Sumbit your pick up and drop off locations to see the routes"
  });

  // Location Input events
  function handleLocationChange(
    index: number,
    input: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedLocations = [...locations];
    updatedLocations[index].location = input.target.value;
    useLocations(updatedLocations);
  }

  function handleLocationDelete(index: number) {
    const updatedLocations = [...locations];
    updatedLocations[index].location = "";
    useLocations(updatedLocations);
  }

  // handle action
  async function handleSubmit() {
    usePathData({
      status: "in-progress",
      message: "Getting path details"
    });
    try {
      // Get token
      const token = (await axios.post(`${process.env.NEXT_PUBLIC_MOCK_API}/route`, {
        origin: locations[0].location,
        destination: locations[locations.length - 1].location,
      })).data;

      // Get route
      let retry = true, res;
      while (retry) {
        res = (await axios.get(`${process.env.NEXT_PUBLIC_MOCK_API}/route/${token}`)).data;
        if (res.status === "in progress") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else{
          retry = false;
        }
      }

      // handle response
      if (res.status === "success") {
        usePathData({
          status: "success",
          message: "Path Details",
          totalDistance: res.total_distance,
          totalTime: res.total_time,
          path: res.path
        });
      } else if (res.status === "failure") {
        usePathData({
          status: "error",
          message: res.error
        });
      } else {
        usePathData({
          status: "error",
          message: "There is an error when retrieving the route. Please re-submit."
        });
      }
    } catch (e) {
      usePathData({
        status: "error",
        message: "There is an error when retrieving the route. Please re-submit."
      });
    }
  }

  function handleClear() {
    useLocations([
      {
        index: 0,
        location: ""
      },
      {
        index: 1,
        location: ""
      }
    ]);
    usePathData({
      status: "none",
      message: "Sumbit your pick up and drop off locations"
    });
  }

  return (
    <div className="flex flex-col h-[95%] mx-4">
      <h2 className="text-2xl font-bold mb-2">Location Selector</h2>
      <div className="grow laptop:grid laptop:grid-cols-4 laptop:gap-8">
        <div className="flex flex-col max-laptop:mb-4 laptop:col-span-1 col-span-0">
          <div className="mb-8">
            {locations.map((item, i, arr) => {
              const label = `Location ${i + 1}${
                i === 0 ? " (Pick Up)" : i === arr.length - 1 ? " (Drop Off)" : ""
              }`;
              return (
                <LocationInput
                  key={i}
                  name="location"
                  label={label}
                  value={item.location}
                  deletable={item.location !== ""}
                  onInputChange={(input: React.ChangeEvent<HTMLInputElement>) =>
                    handleLocationChange(i, input)
                  }
                  onLocationDelete={() => handleLocationDelete(i)}
                  className={`${i !== arr.length - 1 ? "mb-2" : ""}`} 
                ></LocationInput>
              );
            })}
          </div>
          <ResultContainer pathDetails={pathData} className="mb-4"/>
          <div className="flex justify-between">
            <ActionButton onClick={handleSubmit} label={`${pathData.status === "error" ? "Re-" : "" }Submit`} disabled={locations.some((item) => item.location.trim() === "") || pathData.status === "in-progress"} />
            <ActionButton onClick={handleClear} label="Clear" disabled={locations.every((item) => item.location.trim() === "") || pathData.status === "in-progress"} />
          </div>
        </div>
        <div className="laptop:col-span-3 flex flex-col h-3/5 laptop:h-full">
          <h3 className="font-semibold">Routes</h3>
          <MapContainer path={pathData.path} className="grow" />
        </div>
      </div>
    </div>
  );
}
