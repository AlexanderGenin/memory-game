import { ICard } from "../types";
import { shuffle } from "../utils";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
];

export function getCards(): ICard[] {
  return shuffle(
    letters
      .concat(...letters)
      .map((letter, i) => ({
        id: i + 1,
        text: letter,
        open: false,
        isDeleted: false,
      }))
  );
}
