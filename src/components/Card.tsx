import React from "react";
import { useDispatch } from "react-redux";
import { toggleCard } from "../slices/card";
import { ICard } from "../types";

export const Card: React.FC<ICard> = ({ text, id, open }) => {
  const dispatch = useDispatch();

  return (
    <div className="card" onClick={() => dispatch(toggleCard(id))}>
      <p className="number">{open ? text : ""}</p>
    </div>
  );
};
