import React from "react";
import "../styles/custom.scss";
import Tile from "./Tile";
import { Location } from "./Game";

interface Props {
  currentLocation: Location;
  currentDirection: string;
  placeRobot: (x: number, y: number, f?: string) => void;
}

const Board: React.FC<Props> = (props: Props) => {
  //Create board by iterating through empty 2D array and rendering grid tiles
  const BOARD: any = new Array(5).fill(new Array(5).fill(0));

  return (
    <div className="grid-container">
      {BOARD.map((row: [number], r: number) => {
        return row.map((_, c: number) => {
          return (
            <div
              key={`${r}${c}`}
              onClick={() => props.placeRobot(Math.abs(r - 4), c)}
              className="grid-item"
            >
              {/*pass the indexes for the 2D array as tile coordinates [r,c]*/}
              <Tile
                tileCoordinates={[r, c]}
                currentLocation={props.currentLocation}
                currentDirection={props.currentDirection}
              />
            </div>
          );
        });
      })}
    </div>
  );
};

export default Board;
