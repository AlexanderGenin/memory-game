export interface ICard {
  id: number;
  text: string;
  open: boolean;
}

export interface CardState {
  cards: ICard[];
}

export interface RootState {
  cardState: CardState;
}
