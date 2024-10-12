import { useReducer } from "react";

export interface LocationItem {
  index: number;
  location: string;
}

interface Action {
  type: "change" | "delete" | "clear";
  index?: number;
  value?: string;
}

function locationsReducer(locations: LocationItem[], action: Action): LocationItem[] {
  switch (action.type) {
    case "change": {
      return locations.map(l => ({
        index: l.index,
        location: action.index === l.index ? (action.value || "") : l.location
      }));
    }
    case "delete": {
      return locations.map(l => ({
        index: l.index,
        location: action.index === l.index ? "" : l.location
      }));
    }
    case "clear": {
      return locations.map(l => ({
        index: l.index,
        location: ""
      }));
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function useLocations(initLocations: LocationItem[]) {
  const [locations, dispatch] = useReducer(locationsReducer, initLocations);

  function handleLocationChange(
    index: number,
    input: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch({
      type: "change",
      index: index,
      value: input.target.value
    });
  }

  function handleLocationDelete(index: number) {
    dispatch({
      type: "delete",
      index: index
    });
  }

  function handleLocationsClear() {
    dispatch({
      type: "clear"
    });
  }

  return {
    locations,
    handleLocationChange,
    handleLocationDelete,
    handleLocationsClear
  }
}