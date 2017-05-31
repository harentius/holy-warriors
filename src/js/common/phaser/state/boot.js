import phaserGame from '../game';
import load from '../load';

export default {
    create: () => {
        phaserGame.add.text(80, 80, 'Boot', {font: '50px BooCity;line', fill: '#ffffff'});
        Phaser.Canvas.setSmoothingEnabled(phaserGame.context, false);
        phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
        phaserGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        phaserGame.state.start('menu');
    },
    preload: () => {
        load({
            'image': {
                'text-bubble': 'img/level0/text-bubble.png',
            },
            'bitmapFont': {
                'font-BooCity': ['fonts/BooCity/font.png', 'fonts/BooCity/font.fnt'],
            }
        }, phaserGame, window.hw.assetVersion);
    }
}
