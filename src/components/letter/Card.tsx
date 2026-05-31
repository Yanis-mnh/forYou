import React from "react";
import LeftSideText from "./LeftSideText";
import RightSide from "./RightSide";
import { Card as CardPrimitive } from "../ui/card";

const Card = () => {
  return (
    <CardPrimitive className="bg-background/50 absolute flex flex-col md:flex-row p-6 max-w-4xl justify-between md:items-start items-center gap-6 md:gap-12 backdrop-blur-xs">
      <RightSide />
    </CardPrimitive>
  );
};

export default Card;
