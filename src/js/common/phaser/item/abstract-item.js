import {phaserGame} from '../phaser-game'

class AbstractItem {
  constructor() {
    this.itemGroup = phaserGame.add.group();
    this.itemGroup.enableBody = true;
    this.itemGroup.physicsBodyType = Phaser.Physics.P2JS;
    // Has to be configured in inheriters
    this.spriteName = null;
    this.collisionGroup = phaserGame.physics.p2.createCollisionGroup();
  }

  spawn(coordinates) {
    if (!this.spriteName) {
      throw Error("'spriteName' is not configured");
    }

    for (let coordinate of coordinates) {
      let item = this.itemGroup.create(coordinate[0], coordinate[1], this.spriteName);
      item.body.allowGravity = false;
      item.animations.add('animation', [...(new Array(8)).keys()], 8, true);
      item.animations.play('animation');
      item.body.data.gravityScale = 0;
      item.body.fixedRotation = true;
      item.body.setCollisionGroup(this.collisionGroup);
    }
  }

  collect(item) {
    if (item.sprite.key !== this.spriteName || item.hasCollided) {
      return false;
    }

    item.hasCollided = true;
    item.sprite.kill();

    return true;
  }
}

export {AbstractItem};
