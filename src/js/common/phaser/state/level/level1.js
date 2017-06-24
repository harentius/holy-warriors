import {load} from '../../load';
import {phaserGame} from '../../phaser-game';
import {playerAware} from '../../sub-state/player-aware';
import {game} from '../../../data/game';
import {Lamp} from '../../environment/lamp';

let level1 = {
    preload: function () {
        phaserGame.add.text(80, 80, 'Loading...', {font: '50px BooCity', fill: '#ffffff'});
        load({
            'image': {
                'blackout': 'img/level0/blackout.png',
                'background': 'img/level1/background.png',
                'floor': 'img/level1/floor.png',
            },
            'spritesheet': {
                'light-source': ['img/level0/light-source.png', 11, 23, 8],
            },
        }, phaserGame, window.hw.assetVersion);

        playerAware.preload.call(this);
    },

    create: function () {
        game.level = 1;
        // Fade in
        phaserGame.camera.flash(0xffffff, 1500);
        phaserGame.add.sprite(0, 0, 'background');
        phaserGame.add.sprite(0, 0, 'blackout');

        let lamp = new Lamp();
        lamp.spawn();

        this.floor = phaserGame.add.tileSprite(0, 135, 320, 8, 'floor');
        phaserGame.physics.enable(this.floor, Phaser.Physics.ARCADE);
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;
        playerAware.create.call(this);
    },

    update: function () {
        phaserGame.physics.arcade.collide(this.player.characterSprite, this.floor);
        playerAware.update.call(this);
    }
};

export {level1};
