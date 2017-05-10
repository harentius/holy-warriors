import boot from './state/boot';
import level1 from './state/level/level1';
import Player from '../data/player';

let config = {
    debug: window.hw.debug,
};

let phaserGameData = {};
let gameData = {
    player: new Player(),
};

let phaserGame = new Phaser.Game(480, 270, Phaser.CANVAS, 'holy-warriors');

phaserGame.state.add('boot', boot);
phaserGame.state.add('level1', level1);

phaserGame.state.start('boot');
export default phaserGame;

// , {
//     preload: () => load(phaserGame, window.hw.assetVersion),
//     create: () => phaserGameData = create(phaserGame, config),
//     update: () => update(phaserGame, phaserGameData, gameData),
// }, '', null, false, false
// );

// phaserGame.state.render = render(phaserGame, config);
