import {load} from '../load';
import {phaserGame} from '../phaser-game';
import {Player} from '../character/common/player';

let playerAware = {
    preload: function () {
        load({
            'spritesheet': {
                'player': ['img/player.png', 31, 33],
            },
        }, phaserGame, window.hw.assetVersion);
        this.player = new Player();
    },

    create: function (x = 100) {
        this.player.spawn(x);
        phaserGame.camera.follow(this.player.characterSprite, Phaser.Camera.FOLLOW_PLATFORMER);
        this.keys = {
            cursors: phaserGame.input.keyboard.createCursorKeys(),
            jump: phaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };
    },

    update: function () {
        if (!this.keys.cursors.left.isDown && !this.keys.cursors.right.isDown) {
            this.player.walkStop();
        } else if (this.keys.cursors.left.isDown) {
            this.player.walkLeft();
        } else if (this.keys.cursors.right.isDown) {
            this.player.walkRight();
        }

        if (this.keys.jump.isDown) {
            this.player.jump();
        }
    }
};

export {playerAware};
