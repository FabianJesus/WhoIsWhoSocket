const REM = 16;
const CARDWIDTHREM = 6;
const SPACECARD = 0.8;

const ROUTE = {
  KIND: ['simpsons', 'mario'],
  IMG: {
    simpsons: [
      'lisa',
      'maggie',
      'bart',
      'marge',
      'homer',
      'burns',
      'ned',
      'milhouse',
      'martin',
      'nelson',
      'janey',
      'moe',
      'carl'
    ],
    mario: [
      'mario',
      'luigi',
      'peach',
      'yoshi',
      'bowser',
      'koopa',
      'bebe-mario',
      'bebe-luigi',
      'bebe-peach',
      'bowsy',
      'goomba',
      'roy',
      'shy-guy',
      'blal'
    ]
  },
  NUMS: {},
  route: function(kind, img) {
    return (
      'assets/img/' +
      this.KIND[kind] +
      '/' +
      this.IMG[this.KIND[kind]][img] +
      '.png'
    );
  }
};

ROUTE.KIND.map(type => {
  ROUTE.NUMS[type] = ROUTE.IMG[type].length;
});

const PLAYERID = {
  BOARD: 'boardPlayer',
  CARD: 'cardPlayer',
  NUM: 'numPlayer',
  NAME: 'playerName'
};
const BUTTONID = {
  PASS: 'boardPlayer',
  CONFIRM: 'cardPlayer'
};

const SOCKET = {
  URL: 'http://localhost:3050'
};
