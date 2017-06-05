import {phaserGame} from '../../phaser-game';
import {load} from '../../load';
import {config} from '../../../config';
import {Stranger} from '../../../character/level0/stranger';
import {Joe} from '../../../character/level0/joe';

let level0 = {
    preload: () => {
        phaserGame.add.text(80, 80, 'Loading...', {font: '50px BooCity', fill: '#ffffff'});
        load({
            'image': {
                'frame-1-background': 'img/level0/frame-1-background.png',
                'developer-behind-desk-surprised': 'img/level0/developer-behind-desk-surprised.png',
                'blackout': 'img/level0/blackout.png',
                'stranger-avatar': 'img/level0/stranger-avatar.png',
                'developer-avatar': 'img/level0/developer-avatar.png',
            },
            'spritesheet': {
                'developer-behind-desk': ['img/level0/developer-behind-desk.png', 40, 29, 8],
                'stranger': ['img/level0/stranger.png', 16, 35, 8],
                'stranger-walk': ['img/level0/stranger-walk.png', 23, 40, 6],
                'light-source': ['img/level0/light-source.png', 11, 23, 8],
                'door': ['img/level0/door.png', 32, 49, 4],
            },
            'audio': {
                'typing': 'audio/obsession.mp3',
                'door-open': 'audio/door-open.wav',
            }
        }, phaserGame, window.hw.assetVersion);
    },
    create: () => {
        // Fade in
        phaserGame.camera.flash('#000000', 2500);

        // Init audio track
        let audioTyping = phaserGame.add.audio('typing');
        phaserGame.sound.setDecodedCallback([audioTyping], () => {
            audioTyping.play(null, null, 0.3);
            audioTyping.loopFull(0.3);
        }, phaserGame);

        let audioDoorOpen = phaserGame.add.audio('door-open');

        phaserGame.add.sprite(0, 0, 'frame-1-background');
        let door = phaserGame.add.sprite(20, config.floorPosition - 49, 'door');
        door.animations.add('door-open');

        // Light source sprite and animation
        let lightSource = phaserGame.add.sprite(130, config.ceilingPosition + 1, 'light-source');
        lightSource.animations.add('lightSource');
        phaserGame.time.events.repeat(Phaser.Timer.SECOND * 2, 100500, () => {
            lightSource.animations.play('lightSource', 8);
        }, phaserGame);

        let joe = new Joe();
        joe.spawn();

        phaserGame.add.sprite(0, 0, 'blackout');

        // Stranger appear
        phaserGame.time.events.add(Phaser.Timer.SECOND * 4, () => {
            door.animations.play('door-open');
            audioDoorOpen.play(null, null, 1.0);
            let stranger = new Stranger();
            stranger.spawn();

            // Developer surprised
            phaserGame.time.events.add(Phaser.Timer.SECOND, () => {
                joe.surprise();
            });

            stranger.walkToPlayer()
                .then(() => stranger.say([
                    'HELLO, JOE',
                    'I SEE YOU ARE TIRED',
                    'NEVERTHELESS I WANT TO PROPOSE YOU A JOB, ',
                    'THAT CAN CHANGE YOUR ENTIRE LIFE.',
                ])).then(() => joe.say([
                    "OKAY. IT'S LOOK LIKE, I HAVE NOTHING TO LOSE.",
                    'WHAT EXACTLY SHOULD I DO?',
                ])).then(() => stranger.say([
                    'PROBABLY YOU WILL UNDERSTAND',
                    'SOON',
                ], true))
            ;
        }, phaserGame);
    }
};

export {level0};
