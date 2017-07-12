import { Phaser } from 'phaser';
import { phaserGame } from '../phaser-game';
import { load } from '../load';

const boot = {
  create: () => {
    phaserGame.add.text(80, 80, 'Boot', { font: '50px BooCity;line', fill: '#ffffff' });
    Phaser.Canvas.setSmoothingEnabled(phaserGame.context, false);
    phaserGame.physics.startSystem(Phaser.Physics.P2JS);
    phaserGame.physics.p2.setImpactEvents(true);
    phaserGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    phaserGame.physics.p2.gravity.y = 400;
    phaserGame.state.start('menu');
  },
  preload: () => {
    load({
      image: {
        'text-bubble': 'img/text-bubble.png',
        'char-bubble': 'img/char-bubble.png',
      },
      bitmapFont: {
        'font-BooCity': ['fonts/BooCity/font.png', 'fonts/BooCity/font.fnt'],
      },
    }, phaserGame);
  },
};

export { boot };
