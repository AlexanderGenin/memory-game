import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardState, ICard } from "../types";

export const initialState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    toggleCard(state, { payload }: PayloadAction<number>) {
      state.cards.map((card) => {
        if (payload === card.id) card.open = !card.open;
        return card;
      });
    },
    setCards(state, { payload }: PayloadAction<ICard[]>) {
      state.cards = payload;
    },
  },
});

export const { toggleCard, setCards } = cardSlice.actions;

export default cardSlice.reducer;
