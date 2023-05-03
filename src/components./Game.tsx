import React, { useState } from "react";
import Board from "./Board";
import { DIRECTION_MAP } from "../utility/constants";
import ControlPanel from "./ControlPanel";
import Robot from "./Robot";

export interface Location {
  x: number;
  y: number;
}

const Game: React.FC = (): JSX.Element => {
  const [currentLocation, setLocation] = useState<Location>({ x: -1, y: -1 });
  const [currentDirection, setCurrentDirection] = useState<string>("SOUTH");
  
  const placeRobot = (x: number, y: number, f?: string) => {
    //prevent the robot from moving beyond the bounds with animation
    if (x >= 5 || y >= 5 || x < 0 || y < 0) {
      return handleAnimation();
    }
    setLocation({ x: x, y: y });
    //set current direction to passed string or leave as current direction
    setCurrentDirection(f || currentDirection);
  };

  const moveRobot = () => {
    switch (currentDirection) {
      case "SOUTH":
        return placeRobot(
          currentLocation.x - 1,
          currentLocation.y,
          currentDirection
        );
      case "NORTH":
        return placeRobot(
          currentLocation.x + 1,
          currentLocation.y,
          currentDirection
        );
      case "WEST":
        return placeRobot(
          currentLocation.x,
          currentLocation.y - 1,
          currentDirection
        );
      case "EAST":
        return placeRobot(
          currentLocation.x,
          currentLocation.y + 1,
          currentDirection
        );
      default:
        return;
    }
  };

  const turnLeft = () => {
    if (isNotPlaced()) return handleAnimation();
    //use DIRECTION_MAP (array of directions ["SOUTH", "WEST", "NORTH", "EAST"]) to easily direction after turning
    let currentDirectionIndex = DIRECTION_MAP.indexOf(currentDirection);
    //get new direction but wrap around to back if less than 0
    let newDirectionIndex =
      (currentDirectionIndex - 1 + DIRECTION_MAP.length) % DIRECTION_MAP.length;

    setCurrentDirection(DIRECTION_MAP[newDirectionIndex]);
  };

  const turnRight = () => {
    if (isNotPlaced()) return handleAnimation();
    //use DIRECTION_MAP to easily direction after turning
    let currentDirectionIndex = DIRECTION_MAP.indexOf(currentDirection);
    //get new direction but wrap around to back if greater than 4
    let newDirectionIndex = (currentDirectionIndex + 1) % DIRECTION_MAP.length;

    setCurrentDirection(DIRECTION_MAP[newDirectionIndex]);
  };

  const reportLocation = () => {
    alert(
      `The robot's current currentLocation is at x: ${currentLocation.x} y: ${currentLocation.y} facing ${currentDirection}`
    );
  };

  //function to handle animation when user attempts
  //to move robot out of the range
  function handleAnimation() {
    const div = document.querySelector<HTMLDivElement>("#robot_id");
    if (div) div.style.animation = "shake 0.5s";
    div?.addEventListener("animationend", () => {
      div.style.animation = "";
    });
    return;
  }

  //Function to check if the robot has been placed after initial
  //start to game
  function isNotPlaced() {
    return currentLocation.x === -1 || currentLocation.y === -1;
  }

  return (
    <div className="game_wrapper">
      <div className="board_area_wrapper">
        <Board
          currentLocation={currentLocation}
          currentDirection={currentDirection}
          placeRobot={placeRobot}
        />
        {/* Show the robot next to the board if it hasn't been initially placed yet */}
        {isNotPlaced() && <Robot currentDirection={currentDirection} />}
      </div>
      <ControlPanel
        moveRobot={moveRobot}
        turnLeft={turnLeft}
        turnRight={turnRight}
        placeRobot={placeRobot}
        reportLocation={reportLocation}
      />
    </div>
  );
};

export default Game;
