import React from "react";
import { useDispatch } from "react-redux";
import { thunkShowCard } from "../slices/card";
import { ICard } from "../types";

export const Card: React.FC<ICard> = ({ text, id, open }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(thunkShowCard(id));
  };

  return (
    <div className="card" onClick={handleClick}>
      <p className="number">{open ? text : ""}</p>
    </div>
  );
};
