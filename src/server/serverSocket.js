const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//const constant = require("../assets/constants/constantsSocket");

const users = {};
let idfirst;
let typeDeck = 0;
let turn;

function numUser() {
  return Object.values(users).length;
}
function emitNumUsers(io) {
  const numberUsers = numUser();
  io.emit('NUMBER_USERS', numberUsers);
}

function win(io, winner) {
  io.emit('WIN', winner);
}
function init(io) {
  io.emit('INIT');
}
function start(io) {
  io.emit('TURN', turn);
  io.emit('DECK', typeDeck);
  io.emit('CARD');
  io.emit('START');
}

io.on('connection', function(socket) {
  users[socket.id] = socket;
  if (numUser() === 1) {
    idfirst = socket.id;
  } else if (numUser() === 2) {
    oponent = {
      [socket.id]: idfirst,
      [idfirst]: socket.id
    };
    turn = idfirst;
    start(io);
  } else {
    socket.disconnect(true);
  }
  io.emit('DECK', typeDeck);
  emitNumUsers(io);

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('CHANGE_NAME', function(name) {
    users[socket.id].name = name;
  });

  socket.on('CHANGE_TURN', function() {
    if (turn === socket.id) {
      turn = oponent[turn];
      io.emit('TURN', turn);
    }
  });

  socket.on('CHANGE_DECK', function(type) {
    if (turn === socket.id && type !== typeDeck) {
      typeDeck = type;
      start(io);
    }
  });

  socket.on('PLAYER_CARD', function(card) {
    users[socket.id].card = card;
  });

  socket.on('CHECK_PLAYER_CARD', function(card) {
    if (turn === socket.id) {
      users[oponent[socket.id]].card == card
        ? win(io, socket.id)
        : win(io, oponent[socket.id]);
    }
  });

  socket.on('disconnect', function() {
    delete users[socket.id];
    if (numUser() == 1) {
      idfirst = oponent[socket.id];
      init(io);
    }
    emitNumUsers(io);
  });
});

http.listen(3050, function() {
  console.log('listening on *:3050');
});
