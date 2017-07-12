import { load } from '../load';
import { phaserGame } from '../phaser-game';
import { Crutch } from '../item/common/crutch';

const crutchAware = {
  preload() {
    load({
      spritesheet: {
        crutch: ['img/crutch.png', 22, 26, 8],
      },
    }, phaserGame);
  },

  create(coordinates) {
    this.crutch = new Crutch();
    this.crutch.spawn(coordinates);

    this.player.characterSprite.body.collides(this.crutch.collisionGroup);
    this.crutch.itemGroup.forEach((children) => {
      children.body.collides(this.player.collisionGroup, this.crutch.collect, this.crutch);
    });
  },
};

export { crutchAware };
