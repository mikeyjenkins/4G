import React, { useState } from "react";
import { DIRECTION_MAP } from "../utility/constants";

type Props = {
  turnRight: () => void;
  turnLeft: () => void;
  moveRobot: () => void;
  placeRobot: (x: number, y: number, f?: string) => void;
  reportLocation: () => void;
};

const ControlPanel: React.FC<Props> = ({
  turnLeft,
  turnRight,
  moveRobot,
  placeRobot,
  reportLocation,
}) => {
  const [placeRobotForm, setPlaceRobotForm] = useState({
    x: "",
    y: "",
    direction: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceRobotForm({ ...placeRobotForm, [e.target.name]: e.target.value });
  };

  const handlePlaceRobot = () => {
    //validate x coordinate in range and a number
    if (
      isNaN(parseInt(placeRobotForm.x)) ||
      +placeRobotForm.x < 0 ||
      +placeRobotForm.x > 4
    ) {
      return alert("x value must be a valid number between 0 and 4");
    }
    //validate x coordinate in range and a number
    if (
      isNaN(parseInt(placeRobotForm.y)) ||
      +placeRobotForm.y < 0 ||
      +placeRobotForm.y > 4
    ) {
      return alert("y value must be a valid number between 0 and 4");
    }
    //validate input is a valid direction
    if (!DIRECTION_MAP.includes(placeRobotForm.direction)) {
      return alert("direction must be NORTH, SOUTH, EAST, or WEST");
    }
    placeRobot(+placeRobotForm.x, +placeRobotForm.y, placeRobotForm.direction);
  };

  return (
    <div className="controller_wrapper">
      <div className="movement_wrapper">
        <button onClick={turnLeft}>{"< Left"}</button>
        <button onClick={moveRobot}>Move</button>
        <button onClick={turnRight}>{"Right >"}</button>
      </div>
      <div className="placement_wrapper">
        <label htmlFor="x">X Coordinate</label>
        <input name="x" value={placeRobotForm.x} onChange={handleFormChange} />
        <label htmlFor="y">Y Coordinate</label>
        <input name="y" value={placeRobotForm.y} onChange={handleFormChange} />
        <label htmlFor="direction">Direction</label>
        <input
          name="direction"
          value={placeRobotForm.direction}
          onChange={handleFormChange}
        />
      </div>

      <button onClick={handlePlaceRobot}>Place</button>
      <button onClick={reportLocation}>Report</button>
    </div>
  );
};

export default ControlPanel;
