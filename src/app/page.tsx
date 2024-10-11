"use client";

import {useState, useEffect} from "react";
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
  /* TODO: remove if no use
  const [newLocationAddable, useNewLocationAddable] = useState(false);
  */
  const [locationCanSubmit, useLocationCanSubmit] = useState(false);
  const [pathData, usePathData] = useState<IPathDetails>({
    status: "none",
    message: "Sumbit your pick up and drop off locations"
  });

  useEffect(() => {
    setLocationCanSubmit();
  }, [locations, pathData.status]);

  function setLocationCanSubmit() {
    useLocationCanSubmit(locations.every((item) => item.location.trim() !== "") && pathData.status !== "in-progress");
  }

  /* TODO: remove if no use
  function setNewLocationAddable() {
    useNewLocationAddable(
      locations.length < 5 &&
        locations.every((item) => item.location.trim() !== "")
    );
  }
  */

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

  /* TODO: remove if no use
  function handleLocationAdd() {
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
  */

  async function handleSubmit() {
    usePathData({
      status: "in-progress",
      message: "Getting path details..."
    })
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
    <div className="p-4 grid grid-flow-col laptop:grid-flow-row gap-4">
      <div className="laptop:col-span-1">
        <div className="">
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
              ></LocationInput>
            );
          })}
          
          {/* TODO: remove if no use
            <ActionButton
            onClick={handleLocationAdd}
            label="Add Location"
            disabled={!newLocationAddable}
            className="mt-4"
          /> */}
        </div>
        <ResultContainer pathDetails={pathData} className=""/>
        <div className="grid grid-cols-2 gap-4 mt-4 ">
          <ActionButton onClick={handleSubmit} label={`${pathData.status === "error" ? "Re-" : "" }Submit`} disabled={!locationCanSubmit} />
          <ActionButton onClick={handleClear} label="Clear" disabled={locations.every((item) => item.location.trim() === "")} />
        </div>
      </div>
      {/* TODO: fix map width & height */}
      <MapContainer path={pathData.path} />
    </div>
  );
}
