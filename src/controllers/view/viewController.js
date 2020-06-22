class ViewController {
  constructor(view) {
    this._view = view;
    this._GUI = {
      [PLAYERID.BOARD]: this.view.getElementById(PLAYERID.BOARD),
      [PLAYERID.CARD]: this.view.getElementById(PLAYERID.CARD),
      [PLAYERID.NAME]: this.view.getElementById(PLAYERID.NAME),
      [PLAYERID.NUM]: this.view.getElementById(PLAYERID.NUM),
      [BUTTONID.PASS]: this.view.getElementById(BUTTONID.PASS),
      [BUTTONID.CONFIRM]: this.view.getElementById(BUTTONID.CONFIRM),
      CHAT: this.view.getElementById('msg'),
      MSG: this.view.getElementById('textmsg'),
      TURN: this.view.getElementById('Turn')
    };
    this._maxCard;
    this.calculateMaxCard();
  }
  get view() {
    return this._view;
  }

  get GUI() {
    return this._GUI;
  }

  get maxCard() {
    return this._maxCard;
  }
  set maxCard(value) {
    this._maxCard = value;
  }
  get moveY() {
    return this._moveY;
  }

  calculateMaxCard = () => {
    let maxNum =
      (this.GUI[PLAYERID.BOARD].offsetWidth / (REM * CARDWIDTHREM)) * SPACECARD;
    this.maxCard = parseInt(maxNum);
  };

  printBoards = (cards, BoardPlayer) => {
    this.GUI[BoardPlayer].innerHTML = '';
    let rowsCard = [];
    for (let i = 0, aLen = cards.length; i <= aLen; i += this.maxCard) {
      rowsCard.push(cards.slice(i, i + this.maxCard));
    }
    rowsCard.map(row => this.printRow(row, this.GUI[BoardPlayer]));
  };
  printRow = (cards, container) => {
    cards.map(card => this.printCard(card, container));
    const hr = this.view.createElement('hr');
    container.appendChild(hr);
  };

  printCard = (card, container) => {
    const containerCard = this.view.createElement('div');
    containerCard.classList.add('containerCard');
    const spaceCard = this.view.createElement('div');
    spaceCard.classList.add('card-space');
    const cardDiv = this.view.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.dataset.card = card.id;
    const img = this.view.createElement('img');
    img.classList.add('front');
    img.src = card.route;
    cardDiv.appendChild(img);
    const back = this.view.createElement('div');
    back.classList.add('back');
    cardDiv.appendChild(back);
    spaceCard.appendChild(cardDiv);
    containerCard.appendChild(spaceCard);
    const input = this.view.createElement('input');
    input.type = 'checkbox';
    input.value = card;
    containerCard.appendChild(input);
    container.appendChild(containerCard);
  };
  getInputPlayer = () => {
    return this.GUI[PLAYERID.BOARD].querySelectorAll(
      'input[type=checkbox]:checked'
    );
  };
  printCardPlayer = card => {
    this.GUI[PLAYERID.CARD].innerHTML = '';
    const img = this.view.createElement('img');
    img.src = card.route;
    this.GUI[PLAYERID.CARD].appendChild(img);
  };

  flipCard = div => {
    div.classList.toggle('flip');
  };
  flipPlayerCard = () => {
    this.classList.toggle('ocult');
  };
  printNamePlayer = name => {
    this.GUI[PLAYERID.NAME].innerHTML = `Jugador ${name}`;
  };
  printNumPlayer = number => {
    this.GUI[PLAYERID.NUM].innerHTML = 'Numero de jugadores: ' + number;
  };
  printChat = msg => {
    const line = this.view.createElement('li');
    line.innerHTML = msg;
    this.GUI.CHAT.appendChild(line);
  };
  getMsg = () => {
    return this.GUI.MSG.value;
  };
  printTurn = turn => {
    this.GUI.TURN.innerHTML = turn;
  };
}
