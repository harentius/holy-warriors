import {phaserGame} from '../phaser-game'

class AbstractItem {
    constructor() {
        this.itemGroup = phaserGame.add.group();
        // Has to be configured in inheriters
        this.spriteName = null;
    }

    spawn(coordinates) {
        if (!this.spriteName) {
            throw Error("'spriteName' is not configured");
        }

        for (let coordinate of coordinates) {
            let item = this.itemGroup.create(coordinate[0], coordinate[1], this.spriteName);
            item.animations.add('animation', [...(new Array(8)).keys()], 8, true);
            item.animations.play('animation');
        }
    }

    collect() {

    }
}

export {AbstractItem};
