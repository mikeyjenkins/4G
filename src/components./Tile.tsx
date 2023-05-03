import React from "react";
import { Location } from "./Game";
import Robot from "./Robot";

interface Props {
  tileCoordinates: number[];
  currentLocation: Location;
  currentDirection: string;
}

const Tile: React.FC<Props> = (props: Props) => {
  //check if current tile is the currentLocation of the robot for conditional render
  //use Math.abs to set 0,0 to SOUTH WEST corner of matrix per instructions
  const isCurrentLocation = (tileCoordinates: number[], currentLocation: Location) => {
    return (
      tileCoordinates[0] === Math.abs(currentLocation.x - 4) &&
      tileCoordinates[1] === currentLocation.y
    );
  };

  return (
    <div>
      {isCurrentLocation(props.tileCoordinates, props.currentLocation) ? (
        <Robot currentDirection={props.currentDirection} />
      ) : (
        <div className="empty_tile_message">Place Robot Here</div>
      )}
    </div>
  );
};

export default Tile;
