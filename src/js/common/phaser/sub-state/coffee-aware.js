import { load } from '../load';
import { phaserGame } from '../phaser-game';
import { Coffee } from '../item/common/coffee';

const coffeeAware = {
  preload() {
    load({
      spritesheet: {
        coffee: ['img/cup.png', 9, 13, 8],
      },
    }, phaserGame);
  },

  create(coordinates) {
    this.coffee = new Coffee();
    this.coffee.spawn(coordinates);

    this.player.characterSprite.body.collides(this.coffee.collisionGroup);
    this.coffee.itemGroup.forEach((children) => {
      children.body.collides(this.player.collisionGroup, this.coffee.collect, this.coffee);
    });
  },
};

export { coffeeAware };
