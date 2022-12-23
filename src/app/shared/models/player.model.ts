export interface Player {
  id: string;
  name: string;
  decks: Deck[];
}

export interface Deck {
  name: string;
  cards: number;
}
