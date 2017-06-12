import {load} from '../load';
import {phaserGame} from '../phaser-game';

let playerAware = {
    preload: function () {
        load({
            'spritesheet': {
                'player': ['img/player.png', 31, 33],
            },
        }, phaserGame, window.hw.assetVersion);
    },

    create: function () {
        this.player = phaserGame.add.sprite(100, 100, 'player', 6);
        // this.playerWalk = phaserGame.add.sprite(100, 100, 'player-walk');
        // this.playerWalk.visible = false;
        // this.player.animations.add('player-walk', 'player-walk');
        this.player.animations.add('player-walk', [...(new Array(5)).keys()]);
        phaserGame.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        phaserGame.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.keys = {
            cursors: phaserGame.input.keyboard.createCursorKeys(),
            jump: phaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };
        this.jumpTimer = 0;
    },

    update: function () {
        this.player.body.velocity.x = 0;

        if (this.keys.cursors.left.isDown) {
            this.player.body.velocity.x = -50;
        } else if (this.keys.cursors.right.isDown) {
            this.player.animations.play('player-walk', 10);
            this.player.body.velocity.x = 50;
        }

        if (this.keys.jump.isDown && this.player.body.touching.down && phaserGame.time.now > this.jumpTimer) {
            this.player.body.velocity.y = -200;
            this.jumpTimer = phaserGame.time.now + 250;
        }

        // this.player.visible = true;
        // this.playerWalk.visible = false;
    }
};

export {playerAware};
