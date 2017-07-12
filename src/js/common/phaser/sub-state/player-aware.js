import { Phaser } from 'phaser';
import { load } from '../load';
import { phaserGame } from '../phaser-game';
import { Player } from '../character/common/player';

const playerAware = {
  preload() {
    load({
      spritesheet: {
        player: ['img/player.png', 38, 36],
      },
    }, phaserGame);
  },

  create(x = 100) {
    this.player = new Player();
    this.player.spawn(x);
    phaserGame.camera.follow(this.player.characterSprite, Phaser.Camera.FOLLOW_PLATFORMER);
    this.keys = {
      cursors: phaserGame.input.keyboard.createCursorKeys(),
      jump: phaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      z: phaserGame.input.keyboard.addKey(Phaser.Keyboard.Z),
    };
  },

  update() {
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

    if (this.keys.z.isDown) {
      this.player.attack();
    }
  },
};

export { playerAware };
