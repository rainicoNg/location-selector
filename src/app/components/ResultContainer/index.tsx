import { IPathDetails } from "@/app/page";

interface IResultContainerProps {
  pathDetails: IPathDetails;
  className?: string;
}
export default function ResultContainer({...props}: IResultContainerProps) {
  return (
    <div className={`border rounded ${props.className}`}>
      <h4 className={props.pathDetails.status}>{props.pathDetails.message}</h4>
      {props.pathDetails.totalDistance && <h5>Total Distance: {props.pathDetails.totalDistance}</h5>}
      {props.pathDetails.totalTime && <h5>Total Time: {props.pathDetails.totalTime}</h5>}
    </div>
  )
}
