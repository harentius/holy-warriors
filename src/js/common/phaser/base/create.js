export default (phaserGame, config) => {
    let phaserGameData = {
        player: null,
        groups: {
            coffee: null,
            crutch: null,
            bug: null,
        },
        keys: {
            cursors: null,
            jump: null,
        },
        layers: {
            world: null,
        },
    };

    let map = phaserGame.add.tilemap('tilemap');

    phaserGame.stage.backgroundColor = '#b5e0ff';

    map.addTilesetImage('sprite');
    map.addTilesetImage('tree');
    map.addTilesetImage('cactus');
    map.setCollisionBetween(1, 16);

    let worldLayer = map.createLayer('World');
    worldLayer.setScale(config.scale, config.scale);
    worldLayer.resizeWorld();
    phaserGameData.layers.world = worldLayer;

    phaserGame.physics.startSystem(Phaser.Physics.ARCADE);

    let coffee = phaserGame.add.group();
    coffee.enableBody = true;
    coffee.scale.setTo(config.scale, config.scale);
    map.createFromObjects('Objects', 17, 'coffee', 0, true, false, coffee);
    phaserGameData.groups.coffee = coffee;

    let crutch = phaserGame.add.group();
    crutch.enableBody = true;
    crutch.scale.setTo(config.scale, config.scale);
    map.createFromObjects('Objects', 18, 'crutch', 0, true, false, crutch);
    phaserGameData.groups.crutch = crutch;

    let tape = phaserGame.add.group();
    tape.enableBody = true;
    tape.scale.setTo(config.scale, config.scale);
    map.createFromObjects('Objects', 44, 'tape', 0, true, false, tape);
    phaserGameData.groups.tape = tape;

    let bug = phaserGame.add.group();
    bug.enableBody = true;
    bug.scale.setTo(config.scale, config.scale);
    map.createFromObjects('Objects', 43, 'bug', 0, true, false, bug);
    phaserGameData.groups.bug = bug;

    let abyss = phaserGame.add.group();
    abyss.scale.setTo(config.scale, config.scale);
    map.createFromObjects('Objects', 45, 'abyss', 0, true, false, abyss);
    phaserGameData.groups.abyss = abyss;

    let player = phaserGame.add.sprite(100, 0, 'player');
    player.scale.setTo(3, 3);
    phaserGame.physics.arcade.enable(player);
    player.body.gravity.y = 900;
    player.body.collideWorldBounds = true;
    phaserGame.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
    phaserGameData.player = player;

    phaserGameData.keys.cursors = phaserGame.input.keyboard.createCursorKeys();
    phaserGameData.keys.jump = phaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    if (config.debug) {
        phaserGame.time.advancedTiming = true;
    }

    return phaserGameData;
}
