import {phaserGame} from '../../phaser-game';
import {load} from '../../load';
import {config} from '../../../config';
import {Stranger} from '../../character/level0/stranger';
import {Joe} from '../../character/level0/joe';
import {game} from '../../../data/game';
import {Lamp} from '../../environment/lamp';

let level0 = {
    preload: function () {
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
                'stranger-open-case': ['img/level0/stranger-open-case.png', 16, 35, 8],
                'light-source': ['img/level0/light-source.png', 11, 23, 8],
                'door': ['img/level0/door.png', 32, 49, 4],
            },
            'audio': {
                'typing': 'audio/obsession.mp3',
                'door-open': 'audio/door-open.wav',
            }
        }, phaserGame, window.hw.assetVersion);
    },

    create: function () {
        game.level = 0;
        // Fade in
        phaserGame.camera.flash(0x0, 2500);

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

        let lamp = new Lamp();
        lamp.spawn();

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
                    'OKAY. IT LOOKS LIKE, I HAVE NOTHING TO LOSE.',
                    'WHAT EXACTLY SHOULD I DO?',
                ])).then(() => stranger.say([
                    'PROBABLY YOU WILL UNDERSTAND',
                    'SOON',
                ], true)).then(() => {
                    stranger.openCase();
                    // Fade out
                    phaserGame.time.events.add(Phaser.Timer.SECOND, () => {
                        phaserGame.camera.fade(0xffffff, 1500);

                        phaserGame.time.events.add(Phaser.Timer.SECOND * 2, () => {
                            phaserGame.state.start('level1');
                        });
                    });
                })
            ;
        }, phaserGame);
    }
};

export {level0};
