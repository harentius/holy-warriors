import load from './base/load';
import create from './base/create';
import update from './base/update';
import render from './base/render';
import Player from '../data/player';

let config = {
    scale: 3,
    debug: window.hw.debug,
};

let phaserGameData;

let phaserGame = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'holy-warriors', {
    preload: () => load(phaserGame, window.hw.assetVersion),
    create: () => phaserGameData = create(phaserGame, config),
    update: () => update(phaserGame, phaserGameData),
}, '', null, false, false
);

phaserGame.state.render = render(phaserGame, config);

export default phaserGame;
