class Card {
  constructor(id, type) {
    this._id = id;
    this._route = ROUTE.route(type, id);
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get route() {
    return this._route;
  }
  set route(value) {
    this._route = value;
  }
  toEquals(card) {
    return this.id === card.id;
  }
}
