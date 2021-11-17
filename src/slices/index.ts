import { combineReducers, Reducer } from "redux";
import cardsReducer from "../slices/card";
import { RootState } from "../types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  cardState: cardsReducer,
});

export default rootReducer;
