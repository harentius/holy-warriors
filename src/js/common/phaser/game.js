import load from './base/load';
import create from './base/create';
import update from './base/update';

let config = {
    scale: 3,
};

let phaserGameData;

let phaserGame = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'holy-warriors', {
    preload: () => load(phaserGame, window.hw.assetVersion),
    create: () => phaserGameData = create(phaserGame, config),
    update: () => update(phaserGame, phaserGameData),
    render: () => {},
}, '', null, false, false
);

export default phaserGame;
