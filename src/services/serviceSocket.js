class ServiceSocket {
  constructor() {
    this._socket = io.connect(SOCKET.URL, { forceNew: true });
  }
  get socket() {
    return this._socket;
  }
  getMsg$() {
    const cb = function(observer) {
      this.socket.on('chat message', msg => {
        observer.next(msg);
      });
    };
    return this.createObservable(cb);
  }
  getNumPlayer$() {
    const cb = function(observer) {
      this.socket.on('NUMBER_USERS', num => {
        observer.next(num);
      });
    };
    return this.createObservable(cb);
  }
  getTurn$() {
    const cb = function(observer) {
      this.socket.on('TURN', id => {
        observer.next(this.socket.id === id ? 'Tu turno' : 'Turno rival');
      });
    };
    return this.createObservable(cb);
  }
  getWin$() {
    const cb = function(observer) {
      this.socket.on('WIN', id => {
        observer.next(
          this.socket.id === id
            ? 'Felicidades has ganado'
            : 'Lo siento has perdido'
        );
      });
    };
    return this.createObservable(cb);
  }
  getStart$() {
    const cb = function(observer) {
      this.socket.on('START', () => {
        observer.next();
      });
    };
    return this.createObservable(cb);
  }

  getCard$() {
    const cb = function(observer) {
      this.socket.on('CARD', () => {
        observer.next();
      });
    };
    return this.createObservable(cb);
  }

  getDeck$() {
    const cb = function(observer) {
      this.socket.on('DECK', type => {
        observer.next(type);
      });
    };
    return this.createObservable(cb);
  }
  createObservable(cb) {
    const observable = new rxjs.Observable(observer => {
      cb.call(this, observer);
    });
    return observable;
  }
  sendMsg(name, msg) {
    this.socket.emit('chat message', `${name}: ${msg}`);
  }
  sendChangeTurn() {
    this.socket.emit('CHANGE_TURN');
  }
  sendChangeDeck(type) {
    this.socket.emit('CHANGE_DECK', type);
  }
  sendPlayerCard(card) {
    this.socket.emit('PLAYER_CARD', card);
  }
  sendCheckCard(card) {
    this.socket.emit('CHECK_PLAYER_CARD', card);
  }
}
