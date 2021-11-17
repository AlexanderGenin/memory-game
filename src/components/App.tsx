import React from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../types";

export default function App() {
  const { cards } = useSelector((state: RootState) => state.cardState);

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
