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
                'developer-avatar': 'img/level0/developer-avatar.png',
            },
            'spritesheet': {
                'light-source': ['img/level0/light-source.png', 11, 23, 8],
                'coffee': ['img/cup.png', 9, 13, 8],
            },
        }, phaserGame, window.hw.assetVersion);

        playerAware.preload.call(this);
        this.isActive = false;
    },

    create: function () {
        game.level = 1;
        // Fade in
        phaserGame.camera.flash(0xffffff, 1500);
        phaserGame.add.sprite(0, 0, 'background');
        phaserGame.add.sprite(0, 0, 'blackout');

        let lamp = new Lamp();
        lamp.spawn();

        let coffeeGroup = phaserGame.add.group();
        let coffee = coffeeGroup.create(133, 111, 'coffee');
        coffee.animations.add('coffee', [...(new Array(8)).keys()], 8, true);
        coffee.animations.play('coffee');

        this.floor = phaserGame.add.tileSprite(0, 135, 320, 8, 'floor');
        phaserGame.physics.enable(this.floor, Phaser.Physics.ARCADE);
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;
        playerAware.create.call(this, 80);
        this.player
            .say([
                'HM... I AM TOO TIRED. MAY BE, THAT WAS JUST A HALLUCINATION',
                'LET ME DRINK A COFFEE',
                'TO WALK LEFT/RIGHT, I CAN USE ARROWS KEYS'
            ], true).then(() => this.isActive = true)
        ;
    },

    update: function () {
        phaserGame.physics.arcade.collide(this.player.characterSprite, this.floor);

        if (this.isActive) {
            playerAware.update.call(this);
        }
    }
};

export {level1};
