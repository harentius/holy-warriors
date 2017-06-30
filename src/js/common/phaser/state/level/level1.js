import {load} from '../../load';
import {phaserGame} from '../../phaser-game';
import {playerAware} from '../../sub-state/player-aware';
import {coffeeAware} from '../../sub-state/coffee-aware';
import {game} from '../../../data/game';
import {Lamp} from '../../environment/lamp';
import {config} from '../../../config.js';
import {HealthBar} from '../../interface/health-bar';

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
                'hearts': ['img/hearts.png', 8, 8, 2],
            },
        }, phaserGame, window.hw.assetVersion);

        playerAware.preload.call(this);
        coffeeAware.preload.call(this);
        this.isActive = false;
    },

    create: function () {
        game.level = 1;
        // Fade in
        phaserGame.camera.flash(0xffffff, 1500);
        phaserGame.add.sprite(0, 0, 'background');
        phaserGame.add.sprite(0, 0, 'blackout');

        phaserGame.world.setBounds(0, 0, config.width, 135);
        phaserGame.physics.p2.updateBoundsCollisionGroup();
        let lamp = new Lamp();
        lamp.spawn();

        phaserGame.add.tileSprite(0, 135, 2 * 320, 8, 'floor');

        coffeeAware.create.call(this, [[133, 117]]);
        playerAware.create.call(this, 80);

        this.player.characterSprite.body.collides(this.coffee.collisionGroup);
        this.coffee.itemGroup.forEach((children) => {
            children.body.collides(this.player.collisionGroup, this.coffee.collect, this.coffee);
        });

        this.player
            .say([
                'HM... I AM TOO TIRED. MAY BE, THAT WAS JUST A HALLUCINATION',
                'LET ME DRINK A COFFEE',
                'TO WALK LEFT/RIGHT, I CAN USE ARROWS KEYS'
            ], true).then(() => {
                this.isActive = true;
                let healthBar = new HealthBar();
                healthBar.showAndWatch();
            })
        ;
    },

    update: function () {
        if (this.isActive) {
            playerAware.update.call(this);
        }
    },
};

export {level1};
