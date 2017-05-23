import menu from './state/menu';
import boot from './state/boot';
import level0 from './state/level/level0';
import config from '../config';

let phaserGame = new Phaser.Game(config.width, config.height, Phaser.CANVAS, 'holy-warriors');

phaserGame.state.add('menu', menu);
phaserGame.state.add('boot', boot);
phaserGame.state.add('level0', level0);

phaserGame.state.start('boot');
export default phaserGame;
