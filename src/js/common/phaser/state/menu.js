import { phaserGame } from '../phaser-game';
import { game } from '../../data/game';

const MenuBuilder = {
  optionCount: 1,
  addEntry: (text, callback) => {
    const menuEntry = phaserGame.add
      .text(phaserGame.world.centerX, (MenuBuilder.optionCount * 40), text, {
        font: '20px BooCity',
        fill: 'white',
        align: 'left',
        stroke: 'rgba(0,0,0,0)',
      })
    ;
    menuEntry.anchor.setTo(0.5);
    menuEntry.useHandCursor = true;
    menuEntry.inputEnabled = true;
    menuEntry.input.useHandCursor = true;
    menuEntry.events.onInputUp.add(callback, this);
    menuEntry.events.onInputOver.add((target) => {
      // eslint-disable-next-line
      target.fill = '#FEFFD5';
      // eslint-disable-next-line
      target.stroke = 'rgba(200,200,200,0.5)';
    }, this);
    menuEntry.events.onInputOut.add((target) => {
      // eslint-disable-next-line
      target.fill = 'white';
      // eslint-disable-next-line
      target.stroke = 'rgba(0,0,0,0)';
    }, this);

    MenuBuilder.optionCount++;
  },
};

const menu = {
  create: () => {
    MenuBuilder.addEntry('New Game', () => {
      phaserGame.state.start('level0');
    });
    MenuBuilder.addEntry('Continue', () => {
      phaserGame.state.start(`level${game.level}`);
    });
    MenuBuilder.addEntry('DEV: Level 0', () => {
      phaserGame.state.start('level0');
    });
    MenuBuilder.addEntry('DEV: Level 1', () => {
      phaserGame.state.start('level1');
    });
  },
};

export { menu };
