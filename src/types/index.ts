export interface ICard {
  id: number;
  text: string;
  open: boolean;
}

export interface ICardTimer {
  id: number;
  timer: ReturnType<typeof setTimeout>;
}

export interface CardState {
  cards: ICard[];
  cardTimers: ICardTimer[];
}

export interface RootState {
  cardState: CardState;
}
