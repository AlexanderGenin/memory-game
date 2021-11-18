import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardState, ICard, ICardTimer, RootState } from "../types";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export const initialState: CardState = {
  cards: [],
  cardTimers: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    showCard(state, { payload }: PayloadAction<ICardTimer>) {
      const { id, timer } = payload;
      state.cards.find((card) => {
        if (id === card.id) card.open = true;
      });
      state.cardTimers.push({ id, timer });
    },
    hideCard(state, { payload: id }: PayloadAction<number>) {
      state.cards.find((card) => {
        if (id === card.id) card.open = false;
      });
      state.cardTimers = state.cardTimers.filter(
        (cardTimer) => id !== cardTimer.id
      );
    },
    updateTimer(state, { payload }: PayloadAction<ICardTimer>) {
      const { id, timer } = payload;
      state.cardTimers.find((card) => {
        if (id === card.id) {
          clearTimeout(card.timer);
          card.timer = timer;
        }
      });
    },
    setCards(state, { payload }: PayloadAction<ICard[]>) {
      state.cards = payload;
    },
  },
});

export const thunkShowCard =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    let cardTimers = [...getState().cardState.cardTimers];
    if (cardTimers.length >= 2) return;
    if (cardTimers.length === 1) {
      const { id: firstCardId } = cardTimers[0];
      const secondCardId = id;
      //   We need these to prevent the second card from hiding immediately
      const timer1 = setTimeout(() => dispatch(hideCard(firstCardId)), 500);
      const timer2 = setTimeout(() => dispatch(hideCard(secondCardId)), 500);
      dispatch(updateTimer({ id: firstCardId, timer: timer1 }));
      dispatch(showCard({ id: secondCardId, timer: timer2 }));
      return;
    }
    const timer = setTimeout(() => dispatch(hideCard(id)), 5000);
    dispatch(showCard({ id, timer }));
  };

export const { showCard, hideCard, setCards, updateTimer } = cardSlice.actions;

export default cardSlice.reducer;
