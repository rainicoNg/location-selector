import { IPathDetails } from "@/app/page";

export default function ResultContainer({...props}: IPathDetails) {
  return (
    <div className="border rounded">
      <h4 className={props.status}>{props.message}</h4>
      {props.totalDistance && <h5>Total Distance: {props.totalDistance}</h5>}
      {props.totalTime && <h5>Total Time: {props.totalTime}</h5>}
    </div>
  )
}
