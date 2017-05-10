import boot from './state/boot';
import level1 from './state/level/level1';
import config from '../config';

let phaserGame = new Phaser.Game(config.width, config.height, Phaser.CANVAS, 'holy-warriors');

phaserGame.state.add('boot', boot);
phaserGame.state.add('level1', level1);

phaserGame.state.start('boot');
export default phaserGame;
