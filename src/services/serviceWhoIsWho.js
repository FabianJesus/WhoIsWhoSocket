class ServiceWhoIsWho {
  constructor(namePlayer) {
    this._deck;
    this._player = new Player(namePlayer);
    this._socketService = new ServiceSocket();
  }
  get cards() {
    return this._deck.cards;
  }
  get name() {
    return this.player.name;
  }
  get deck() {
    return this._deck;
  }
  set deck(type) {
    this._deck = new Deck(type);
  }

  get player() {
    return this._player;
  }
  get socketService() {
    return this._socketService;
  }
  get ramdoms() {
    return [...this.deck.cards].sort(() => 0.5 - Math.random())[0];
  }
  getRandomsCards = () => {
    this.player.card = this.ramdoms;
    this.socketService.sendPlayerCard(this.player.card.id);
  };
  isDeck = type => {
    return this.deck.isDeck(type);
  };
  isIt = cardId => {
    this.socketService.sendCheckCard(cardId);
  };
  getObservable = name => {
    return this.socketService['get' + name + '$']();
  };
  sendMsg = msg => {
    this.socketService.sendMsg(this.player.name, msg);
  };
  changeTurn = () => {
    this.socketService.sendChangeTurn();
  };
  changeDeck = type => {
    this.socketService.sendChangeDeck(type);
  };
}
