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
        this.player.animations.add('walk-right', [...(new Array(5)).keys()]);
        this.player.animations.add('walk-left', [6, 7, 8, 9, 10, 11]);
        this.player.animations.add('idle-right', [12]);
        this.player.animations.add('idle-left', [18]);
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

        if (!this.keys.cursors.left.isDown && !this.keys.cursors.right.isDown) {
            this.player.animations.stop();

            if (this.facing === 'right') {
                this.player.animations.play('idle-right');
            } else {
                this.player.animations.play('idle-left');
            }
        }

        if (this.keys.cursors.left.isDown) {
            this.player.animations.play('walk-left', 12);
            this.player.body.velocity.x = -70;
            this.facing = 'left'
        } else if (this.keys.cursors.right.isDown) {
            this.player.animations.play('walk-right', 12);
            this.player.body.velocity.x = 70;
            this.facing = 'right';
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
