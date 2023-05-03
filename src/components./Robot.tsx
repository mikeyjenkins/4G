import React from "react";
import robot from "../assets/images/robot.png";
import arrow from "../assets/images/arrow.png";
import { DIRECTION_MAP } from "../utility/constants";

interface Props {
  currentDirection: string;
}

const Robot: React.FC<Props> = (props: Props) => {
  const getIconDirection = () => {
    return DIRECTION_MAP.indexOf(props.currentDirection) * 90;
  };

  return (
    <div className="robot_wrapper" id="robot_id">
      <div className="robot_flex" style={{ transform: `rotate(${getIconDirection()}deg)` }}>
        <img className="robot" src={robot} alt="None" />
        <img className="arrow" src={arrow} alt="None" />
      </div>
    </div>
  );
};

export default Robot;


//