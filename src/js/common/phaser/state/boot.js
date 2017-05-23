import phaserGame from '../game';

export default {
    create: () => {
        // TODO
        phaserGame.add.text(80, 80, 'Boot', {font: '50px BooCity', fill: '#ffffff'});
        Phaser.Canvas.setSmoothingEnabled(phaserGame.context, false);
        phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
        phaserGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        phaserGame.state.start('menu');
    }
}
