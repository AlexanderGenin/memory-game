import { ICard } from "../types";
import { shuffle } from "../utils";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function getCards(): ICard[] {
  return shuffle(
    letters
      .concat(...letters)
      .map((letter, i) => ({ id: i + 1, text: letter, open: false }))
  );
}
