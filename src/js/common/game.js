let cursors,
    jumpButton,
    player,
    jumpTimer = 0,
    layer,
    coffee,
    crutch
;

let game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'holy-warriors', {
    preload: () => {
        game.load.spritesheet('player', 'assets/img/character.png');
        game.load.image('sprite', 'assets/img/sprite.png');
        game.load.spritesheet('coffee', 'assets/img/coffee.png');
        game.load.spritesheet('crutch', 'assets/img/crutch.png');
        game.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    },
    create: () => {
        game.stage.backgroundColor = '#EEE';

        let map = game.add.tilemap('tilemap');
        map.addTilesetImage('sprite');
        map.setCollisionBetween(1, 8);
        layer = map.createLayer('World');
        layer.setScale(3, 3);
        layer.resizeWorld();
        game.physics.startSystem(Phaser.Physics.ARCADE);

        coffee = game.add.group();
        coffee.enableBody = true;
        coffee.scale.setTo(3, 3);
        map.createFromObjects('Objects', 9, 'coffee', 0, true, false, coffee);

        crutch = game.add.group();
        crutch.enableBody = true;
        crutch.scale.setTo(3, 3);
        map.createFromObjects('Objects', 10, 'crutch', 0, true, false, crutch);

        player = game.add.sprite(100, 0, 'player');
        player.scale.setTo(3, 3);
        game.physics.arcade.enable(player);
        player.body.gravity.y = 900;
        player.body.collideWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
    },
    update: () => {
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.overlap(player, coffee, collectCoffee, null, this);
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
        }

        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
        {
            player.body.velocity.y = -650;
            jumpTimer = game.time.now + 750;
        }
    },
    render: () => {
        // game.debug.spriteInfo(player, 32, 32);
    }, }, '', null, false, false
);

function collectCoffee(player, coffee) {
    coffee.kill();
    console.log('collect')
}