class Deck {
  constructor(type) {
    this._cards = [...Array(ROUTE.NUMS[ROUTE.KIND[type]]).keys()].map(
      number => {
        return new Card(number, type);
      }
    );
    this._typeDeck = type;
  }
  get cards() {
    return this._cards;
  }
  cardsIsEquals(cardId1, cardId2) {
    card1 = this.cards.find(card => card.id == cardId1);
    card2 = this.cards.find(card => card.id == cardId2);
    return card1.toEquals(card2);
  }
  get typeDeck() {
    return this._typeDeck;
  }
  set typeDeck(type) {
    this._typeDeck = type;
  }
  isDeck(type) {
    return this.typeDeck === type;
  }
}
