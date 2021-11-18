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
    showCard(state, { payload: id }: PayloadAction<number>) {
      state.cards.find((card) => {
        if (id === card.id) card.open = true;
      });
    },
    hideCard(state, { payload: id }: PayloadAction<number>) {
      state.cards.find((card) => {
        if (id === card.id) card.open = false;
      });
    },
    deleteCard(state, { payload: id }: PayloadAction<number>) {
      state.cards.find((card) => {
        if (id === card.id) card.isDeleted = true;
      });
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
    deleteTimer(state, { payload: id }: PayloadAction<number>) {
      state.cardTimers = state.cardTimers.filter(
        (cardTimer) => id !== cardTimer.id
      );
    },
    addTimer(state, { payload }: PayloadAction<ICardTimer>) {
      const { id, timer } = payload;
      state.cardTimers.push({ id, timer });
    },
    setCards(state, { payload }: PayloadAction<ICard[]>) {
      state.cards = payload;
    },
  },
});

export const thunkShowCard =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const cardTimers = [...getState().cardState.cardTimers];
    const cards = [...getState().cardState.cards];

    if (cardTimers.length >= 2) return;

    if (cardTimers.length === 1) {
      const [{ id: firstCardId }] = cardTimers;
      const secondCardId = id;

      if (
        cards.find((card) => card.id === firstCardId)?.text ===
        cards.find((card) => card.id === secondCardId)?.text
      ) {
        dispatch(deleteCard(firstCardId));
        dispatch(deleteTimer(firstCardId));
        dispatch(deleteCard(secondCardId));
        dispatch(deleteTimer(secondCardId));
        return;
      }

      //   We need these to prevent the second card from hiding immediately
      const timer1 = setTimeout(() => {
        dispatch(hideCard(firstCardId));
        dispatch(deleteTimer(firstCardId));
      }, 500);

      dispatch(updateTimer({ id: firstCardId, timer: timer1 }));

      dispatch(showCard(secondCardId));

      const timer2 = setTimeout(() => {
        dispatch(hideCard(secondCardId));
        dispatch(deleteTimer(secondCardId));
      }, 500);

      dispatch(addTimer({ id: secondCardId, timer: timer2 }));

      return;
    }

    // Five-second delay before card is hidden
    dispatch(showCard(id));
    const timer = setTimeout(() => dispatch(hideCard(id)), 5000);
    dispatch(addTimer({ id, timer }));
  };

export const {
  showCard,
  hideCard,
  setCards,
  updateTimer,
  deleteCard,
  deleteTimer,
  addTimer,
} = cardSlice.actions;

export default cardSlice.reducer;
