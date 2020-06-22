class ControllerWhoIsWho {
  constructor(view, service) {
    this._viewWhoIsWho = view;
    this._serviceWhoIsWho = service;
    this.setSubcribes();
    this.viewWhoIsWho.printNamePlayer(this.serviceWhoIsWho.name);
  }
  get viewWhoIsWho() {
    return this._viewWhoIsWho;
  }
  get serviceWhoIsWho() {
    return this._serviceWhoIsWho;
  }
  get turn() {
    return this._turn;
  }
  set turn(value) {
    this._turn = value;
  }
  get oponent() {
    return this._oponent;
  }
  get numPlayer$() {
    return this._numPlayer$;
  }

  start = () => {
    this.printStart();
  };
  setSubcribes = () => {
    this.serviceWhoIsWho
      .getObservable('Msg')
      .subscribe(this.viewWhoIsWho.printChat);
    this.serviceWhoIsWho
      .getObservable('NumPlayer')
      .subscribe(this.viewWhoIsWho.printNumPlayer);
    this.serviceWhoIsWho
      .getObservable('Turn')
      .subscribe(this.viewWhoIsWho.printTurn);
    this.serviceWhoIsWho.getObservable('Deck').subscribe(this.deck);
    this.serviceWhoIsWho.getObservable('Win').subscribe(alert);
    this.serviceWhoIsWho
      .getObservable('Card')
      .subscribe(this.serviceWhoIsWho.getRandomsCards);
    this.serviceWhoIsWho.getObservable('Start').subscribe(this.start);
  };
  printStart = () => {
    this.viewWhoIsWho.printBoards(this.serviceWhoIsWho.cards, PLAYERID.BOARD);
    this.viewWhoIsWho.printCardPlayer(
      this.serviceWhoIsWho.player.card,
      PLAYERID.CARD
    );
  };

  deck = type => {
    this.serviceWhoIsWho.deck = type;
  };
  changeTurn = () => {
    this.serviceWhoIsWho.changeTurn();
  };
  changeDeck = type => {
    this.serviceWhoIsWho.changeDeck(type);
  };

  saidItIs = () => {
    let inputs = this.viewWhoIsWho.getInputPlayer(this.turn);
    if (inputs.length != 1) {
      alert('Marca solo uno');
    } else {
      this.serviceWhoIsWho.isIt(
        inputs[0].parentNode.querySelector('.card').dataset.card
      );
    }
  };
  sendMsg = () => {
    const msg = this.viewWhoIsWho.getMsg();
    this.serviceWhoIsWho.sendMsg(msg);
  };
}
