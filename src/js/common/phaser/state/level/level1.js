import phaserGame from '../../game';
import load from '../../load';
import config from '../../../config';

export default {
    preload: () => {
        phaserGame.add.text(80, 80, 'Loading...', {font: '50px Arial', fill: '#ffffff'});
        load({
            'image': {
                'office': 'assets/img/level1/office.png',
                'door': 'assets/img/level1/door.png',
            },
            'spritesheet': {
                'developer-behind-desk': ['assets/img/level1/developer-behind-desk.png', 40, 29, 8],
                'stranger': ['assets/img/level1/stranger.png', 16, 35, 8],
            }
        }, phaserGame, window.hw.assetVersion);
    },
    create: () => {
        phaserGame.add.sprite(0, 0, 'office');
        phaserGame.add.sprite(0, config.height - 49 - 2, 'door');

        let stranger = phaserGame.add.sprite(10, config.height - 35 - 2, 'stranger');
        stranger.animations.add('smoking');
        stranger.animations.play('smoking', 8, true);

        let developerBehindDesk = phaserGame.add.sprite(50, config.height - 29 - 2, 'developer-behind-desk');
        developerBehindDesk.animations.add('typing');
        developerBehindDesk.animations.play('typing', 8, true);
    }
}
