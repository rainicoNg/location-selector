import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/app/components/Icon";
import { IPathDetails } from "@/app/page";

interface IResultContainerProps {
  pathDetails: IPathDetails;
  className?: string;
}

export default function ResultContainer({...props}: IResultContainerProps) {
  const [header, useHeader] = useState("Waiting for input");
  useEffect(() => {
    switch (props.pathDetails.status) {
      case "error": 
        useHeader("Failed");
        break;
      case "success":
        useHeader("Success!");
        break;
      case "in-progress":
        useHeader("Waiting for result");
        break;
      case "none":
      default:
        useHeader("Waiting for input");
        break;
    }
  }, [props.pathDetails.status]);

  return (
    <div className={props.className}>
      <h3 className={`status-${props.pathDetails.status} text-xl font-bold`}>{header}</h3>
      <p>{props.pathDetails.message}</p>
      {props.pathDetails.status === "in-progress" && <Icon type={faSpinner} spin />}
      {props.pathDetails.totalDistance && <h5>Total Distance: {props.pathDetails.totalDistance}</h5>}
      {props.pathDetails.totalTime && <h5>Total Time: {props.pathDetails.totalTime}</h5>}
    </div>
  )
}
