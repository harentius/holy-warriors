import {load} from '../../load';
import {phaserGame} from '../../phaser-game';
import {playerAware} from '../../sub-state/player-aware';
import {coffeeAware} from '../../sub-state/coffee-aware';
import {crutchAware} from '../../sub-state/crutch-aware';
import {game} from '../../../data/game';
import {EVENT_HEALTH_CHANGE, EVENT_PICK_UP_WEAPON} from '../../../data/player';
import {Lamp} from '../../environment/lamp';
import {config} from '../../../config.js';
import {HealthBar} from '../../interface/health-bar';

let level1 = {
  preload: function() {
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
    crutchAware.preload.call(this);
    this.isActive = false;
  },

  create: function() {
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

    playerAware.create.call(this, 80);
    coffeeAware.create.call(this, [[133, 117]]);
    crutchAware.create.call(this, [[213, 122]]);

    this.player.say([
      'HM... I AM TOO TIRED. MAY BE, THAT WAS JUST A HALLUCINATION',
      'LET ME DRINK A COFFEE',
      'TO WALK LEFT/RIGHT, I CAN USE ARROWS KEYS'
    ], true).then(() => {
      this.isActive = true;
      let healthBar = new HealthBar();
      healthBar.showAndWatch();
      game.playerData.eventDispatcher.once(EVENT_HEALTH_CHANGE, () => {
        this.player
          .say([
            'NOW I FEEL BETTER',
            'I SHOULD DRINK COFFEE TO RESTORE HEALTH POINTS',
            'OH... I SEE A CRUTCH...',
            'NOBODY KNOWS WHAT WAIT ME IN THIS DARK ROOM',
            "IF I TAKE IT, I'LL BE MUCH SAFER",
          ], true);
      });

      game.playerData.eventDispatcher.once(EVENT_PICK_UP_WEAPON, () => {
        this.player.pickUpWeapon();
        this.player.say([
          'LET ME INVESTIGATE OUTSIDE THE ROOM',
          'I CAN USE CRUTCH TO ATTACK INTRUDERS',
          'USING Z KEY',
        ])
      });
    });
  },

  update: function() {
    if (this.isActive) {
      playerAware.update.call(this);
    }
  },
};

export {level1};
