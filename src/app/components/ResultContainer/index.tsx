import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/app/components/Icon";
import { PathDetails } from "@/app/page";

interface ResultContainerProps {
  pathDetails: PathDetails;
  className?: string;
}

export default function ResultContainer({ ...props }: ResultContainerProps) {
  const [header, setHeader] = useState("Waiting for input");

  useEffect(() => {
    switch (props.pathDetails.status) {
      case "error":
        setHeader("Failed");
        break;
      case "success":
        setHeader("Success!");
        break;
      case "in-progress":
        setHeader("Waiting for result");
        break;
      case "none":
      default:
        setHeader("Waiting for input");
        break;
    }
  }, [props.pathDetails.status]);

  return (
    <div className={props.className}>
      <h3 className={`text-xl font-bold status-${props.pathDetails.status}`}>
        {header}
      </h3>
      <p>
        {props.pathDetails.message}
        {props.pathDetails.status === "in-progress" && (
          <Icon type={faSpinner} spin />
        )}
      </p>
      {props.pathDetails.totalDistance && (
        <h5>Total Distance: {props.pathDetails.totalDistance}</h5>
      )}
      {props.pathDetails.totalTime && (
        <h5>Total Time: {props.pathDetails.totalTime}</h5>
      )}
    </div>
  );
}
