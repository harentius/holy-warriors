import phaserGame from '../../game';
import load from '../../load';
import config from '../../../config';

let strangerEnters = () => {
    let stranger = phaserGame.add.sprite(29, config.floorPosition - 35, 'stranger');
    stranger.animations.add('smoking');
    // Smoke
    phaserGame.time.events.repeat(Phaser.Timer.SECOND * 4, 100500, () => {
        stranger.animations.play('smoking', 8);
    }, phaserGame);
};

export default {
    preload: () => {
        phaserGame.add.text(80, 80, 'Loading...', {font: '50px BooCity', fill: '#ffffff'});
        load({
            'image': {
                'frame-1-background': 'img/level1/frame-1-background.png',
                'door': 'img/level1/door.png',
            },
            'spritesheet': {
                'developer-behind-desk': ['img/level1/developer-behind-desk.png', 40, 29, 8],
                'stranger': ['img/level1/stranger.png', 16, 35, 8],
            }
        }, phaserGame, window.hw.assetVersion);
    },
    create: () => {
        phaserGame.camera.flash('#000000', 2500);
        phaserGame.add.sprite(0, 0, 'frame-1-background');
        phaserGame.add.sprite(20, config.floorPosition - 49, 'door');

        let developerBehindDesk = phaserGame.add.sprite(103, config.floorPosition - 29, 'developer-behind-desk');
        developerBehindDesk.animations.add('typing');
        developerBehindDesk.animations.play('typing', 8, true);

        phaserGame.time.events.add(Phaser.Timer.SECOND * 4, strangerEnters, phaserGame);
    }
}
