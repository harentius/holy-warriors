import { Phaser } from 'phaser';
import { menu } from './state/menu';
import { boot } from './state/boot';
import { level0 } from './state/level/level0';
import { level1 } from './state/level/level1';
import { config } from '../config';

const phaserGame = new Phaser.Game(config.width, config.height, Phaser.CANVAS, 'holy-warriors');

phaserGame.state.add('menu', menu);
phaserGame.state.add('boot', boot);
phaserGame.state.add('level0', level0);
phaserGame.state.add('level1', level1);

export { phaserGame };
