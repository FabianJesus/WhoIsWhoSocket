class Player {
  constructor(name) {
    this._card;
    this._name = name;
  }
  get card() {
    return this._card;
  }
  set card(value) {
    this._card = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}
