import {load} from '../load';
import {phaserGame} from '../phaser-game';
import {Crutch} from '../item/common/crutch'

let crutchAware = {
    preload: function () {
        load({
            'spritesheet': {
                'crutch': ['img/crutch.png', 22, 26, 8],
            },
        }, phaserGame, window.hw.assetVersion);
    },

    create: function (coordinates) {
        this.crutch = new Crutch();
        this.crutch.spawn(coordinates);

        this.player.characterSprite.body.collides(this.crutch.collisionGroup);
        this.crutch.itemGroup.forEach((children) => {
            children.body.collides(this.player.collisionGroup, this.crutch.collect, this.crutch);
        });
    },
};

export {crutchAware};
