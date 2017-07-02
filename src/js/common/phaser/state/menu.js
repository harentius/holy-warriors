import {phaserGame} from '../phaser-game';
import {game} from '../../data/game';

let MenuBuilder = {
  optionCount: 1,
  addEntry: (text, callback) => {
    let menuEntry = phaserGame.add.text(phaserGame.world.centerX, (MenuBuilder.optionCount * 40), text, {
      font: '20px BooCity',
      fill: 'white',
      align: 'left',
      stroke: 'rgba(0,0,0,0)'
    });
    menuEntry.anchor.setTo(0.5);
    menuEntry.useHandCursor = true;
    menuEntry.inputEnabled = true;
    menuEntry.input.useHandCursor = true;
    menuEntry.events.onInputUp.add(callback, this);
    menuEntry.events.onInputOver.add(function(target) {
      target.fill = '#FEFFD5';
      target.stroke = 'rgba(200,200,200,0.5)';

    }, this);
    menuEntry.events.onInputOut.add(function(target) {
      target.fill = 'white';
      target.stroke = 'rgba(0,0,0,0)';
    }, this);

    MenuBuilder.optionCount++;
  },
};

let menu = {
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
  }
};

export {menu};
