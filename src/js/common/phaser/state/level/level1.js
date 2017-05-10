import phaserGame from '../../game';

export default {
    preload: () => {
        phaserGame.load.image('office', 'assets/img/level1/office.png');
    },
    create: () => {
        phaserGame.add.sprite(0, 0, 'office');
    }
}
