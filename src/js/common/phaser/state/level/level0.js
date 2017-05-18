import phaserGame from '../../game';
import load from '../../load';
import config from '../../../config';

export default {
    preload: () => {
        phaserGame.add.text(80, 80, 'Loading...', {font: '50px BooCity', fill: '#ffffff'});
        load({
            'image': {
                'frame-1-background': 'img/level0/frame-1-background.png',
                'blackout': 'img/level0/blackout.png',
            },
            'spritesheet': {
                'developer-behind-desk': ['img/level0/developer-behind-desk.png', 40, 29, 8],
                'stranger': ['img/level0/stranger.png', 16, 35, 8],
                'light-source': ['img/level0/light-source.png', 11, 23, 8],
                'door': ['img/level0/door.png', 32, 49, 4],
            },
            'audio': {
                'typing': 'audio/obsession.mp3',
            }
        }, phaserGame, window.hw.assetVersion);
    },
    create: () => {
        // Fade in
        phaserGame.camera.flash('#000000', 2500);

        // Init audio track
        let audioTyping = phaserGame.add.audio('typing');
        phaserGame.sound.setDecodedCallback([audioTyping], () => {
            audioTyping.play();
            audioTyping.loopFull(1.0);
        }, phaserGame);

        phaserGame.add.sprite(0, 0, 'frame-1-background');

        let door = phaserGame.add.sprite(20, config.floorPosition - 49, 'door');
        door.animations.add('door-open');

        // Light source sprite and animation
        let lightSource = phaserGame.add.sprite(130, config.ceilingPosition + 1, 'light-source');
        lightSource.animations.add('lightSource');
        phaserGame.time.events.repeat(Phaser.Timer.SECOND * 2, 100500, () => {
            lightSource.animations.play('lightSource', 8);
        }, phaserGame);

        let developerBehindDesk = phaserGame.add.sprite(103, config.floorPosition - 29, 'developer-behind-desk');
        developerBehindDesk.animations.add('typing');
        developerBehindDesk.animations.play('typing', 8, true);

        phaserGame.add.sprite(0, 0, 'blackout');

        // Stranger appear
        phaserGame.time.events.add(Phaser.Timer.SECOND * 4, () => {
            door.animations.play('door-open');
            let stranger = phaserGame.add.sprite(29, config.floorPosition - 35, 'stranger');
            stranger.animations.add('smoking');
            // Smoke
            phaserGame.time.events.repeat(Phaser.Timer.SECOND * 4, 100500, () => {
                stranger.animations.play('smoking', 8);
            }, phaserGame);
        }, phaserGame);
    }
}
