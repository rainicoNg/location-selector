"use client";

import { useState } from "react";
import axios from "axios";
import LocationInputList from "./components/LocationInputList";
import ResultContainer from "./components/ResultContainer";
import ActionButton from "./components/ActionButton";
import MapContainer from "./components/MapContainer";
import { useLocations } from "@/app/reducer/useLocations";

export interface PathDetails {
  status: "none" | "in-progress" | "success" | "error";
  message: string;
  path?: string[][];
  totalDistance?: number;
  totalTime?: number;
}

export default function Home() {
  const initPathDetails: PathDetails = {
    status: "none",
    message: "Sumbit your pick up and drop off locations to see the routes"
  };

  const [pathData, setPathData] = useState<PathDetails>(initPathDetails);
  const {
    locations,
    handleLocationChange,
    handleLocationDelete,
    handleLocationsClear
  } = useLocations([
    {
      index: 0,
      location: ""
    },
    {
      index: 1,
      location: ""
    }
  ]);

  // handle action
  async function handleSubmit() {
    setPathData({
      status: "in-progress",
      message: "Getting path details"
    });
    try {
      // Get token
      const token = (
        await axios.post(`${process.env.NEXT_PUBLIC_MOCK_API}/route`, {
          origin: locations[0].location,
          destination: locations[locations.length - 1].location
        })
      ).data;

      // Get route
      let retry = true,
        res;
      while (retry) {
        res = (
          await axios.get(`${process.env.NEXT_PUBLIC_MOCK_API}/route/${token}`)
        ).data;
        if (res.status === "in progress") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          retry = false;
        }
      }

      // handle response
      if (res.status === "success") {
        setPathData({
          status: "success",
          message: "Path Details",
          totalDistance: res.total_distance,
          totalTime: res.total_time,
          path: res.path
        });
      } else {
        setPathData({
          status: "error",
          message:
            res.status === "failure"
              ? res.error
              : "There is an error when retrieving the route. Please re-submit."
        });
      }
    } catch (e) {
      setPathData({
        status: "error",
        message:
          "There is an error when retrieving the route. Please re-submit."
      });
      console.error("Error when getting route", e);
    }
  }

  function handleClear() {
    handleLocationsClear();
    setPathData(initPathDetails);
  }

  return (
    <div className="flex flex-col h-[95%] mx-4">
      <h2 className="text-2xl font-bold mb-2">Location Selector</h2>
      <div className="grow laptop:grid laptop:grid-cols-4 laptop:gap-8">
        <div className="flex flex-col  col-span-0 max-laptop:mb-4 laptop:col-span-1">
          <LocationInputList
            locations={locations}
            handleLocationChange={handleLocationChange}
            handleLocationDelete={handleLocationDelete}
            disabled={pathData.status === "in-progress"}
            className="mb-8"
          />
          <ResultContainer
            pathDetails={pathData}
            className="h-28 overflow-y-auto mb-4"
          />
          <div className="flex justify-between">
            <ActionButton
              label={`${pathData.status === "error" ? "Re-" : ""}Submit`}
              disabled={
                locations.some((item) => item.location.trim() === "") ||
                pathData.status === "in-progress"
              }
              onClick={handleSubmit}
            />
            <ActionButton
              label="Clear"
              disabled={
                locations.every((item) => item.location.trim() === "") ||
                pathData.status === "in-progress"
              }
              onClick={handleClear}
            />
          </div>
        </div>
        <div className=" flex flex-col h-3/5 laptop:col-span-3 laptop:h-full">
          <h3 className="font-semibold">Routes</h3>
          <MapContainer path={pathData.path} className="grow" />
        </div>
      </div>
    </div>
  );
}
