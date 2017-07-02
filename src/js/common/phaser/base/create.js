export default (phaserGame, config) => {
  let phaserGameData = {
    player: null,
    groups: {
      coffee: null,
      crutch: null,
      bugs: null,
    },
    keys: {
      cursors: null,
      jump: null,
    },
    layers: {
      world: null,
    },
  };
  // phaserGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // Phaser.Canvas.setSmoothingEnabled(phaserGame.context, false);

  let map = phaserGame.add.tilemap('tilemap');

  phaserGame.stage.backgroundColor = '#b5e0ff';

  map.addTilesetImage('sprite');
  map.addTilesetImage('tree');
  map.addTilesetImage('cactus');
  map.setCollisionBetween(1, 16);

  let worldLayer = map.createLayer('World');
  worldLayer.resizeWorld();
  phaserGameData.layers.world = worldLayer;

  // phaserGame.physics.startSystem(Phaser.Physics.ARCADE);

  let coffee = phaserGame.add.group();
  coffee.enableBody = true;
  map.createFromObjects('Objects', 17, 'coffee', 0, true, false, coffee);
  phaserGameData.groups.coffee = coffee;

  let crutch = phaserGame.add.group();
  crutch.enableBody = true;
  map.createFromObjects('Objects', 18, 'crutch', 0, true, false, crutch);
  phaserGameData.groups.crutch = crutch;

  let tape = phaserGame.add.group();
  tape.enableBody = true;
  map.createFromObjects('Objects', 44, 'tape', 0, true, false, tape);
  phaserGameData.groups.tape = tape;

  let bugs = phaserGame.add.group();
  bugs.enableBody = true;
  map.createFromObjects('Objects', 59, 'bug', 0, true, false, bugs);
  phaserGameData.groups.bugs = bugs;
  phaserGame.physics.enable(bugs, Phaser.Physics.ARCADE);

  for (let bug of bugs.children) {
    bug.body.velocity.x = -50;
  }

  // let player = phaserGame.add.sprite(100, 0, 'player');
  // phaserGame.physics.arcade.enable(player);
  // player.body.gravity.y = 900;
  // player.body.collideWorldBounds = true;
  // phaserGame.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
  // phaserGameData.player = player;

  phaserGameData.keys.cursors = phaserGame.input.keyboard.createCursorKeys();
  phaserGameData.keys.jump = phaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  if (config.debug) {
    phaserGame.time.advancedTiming = true;
  }


  return phaserGameData;
}
