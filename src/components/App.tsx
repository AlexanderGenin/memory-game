import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../types";

export default function App() {
  const [time, setTime] = useState("");
  const { cards } = useSelector((state: RootState) => state.cardState);
  const remainedCards = cards.filter((card) => !card.isDeleted);

  let timer = 90,
    minutes: number | string,
    seconds: number | string;

  useEffect(() => {
    const mainTimer = setInterval(function () {
      minutes = Math.trunc(timer / 60);
      seconds = timer % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTime(minutes + ":" + seconds);

      if (--timer < 0) {
        alert("Time is up");
        clearInterval(mainTimer);
        return;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (remainedCards.length === 0) alert("You won!");
  }, [remainedCards]);

  return (
    <>
      <p>{time}</p>
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </>
  );
}
