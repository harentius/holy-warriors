import {phaserGame} from '../phaser-game';
import {config} from '../../config';

class Lamp {
    spawn() {
        let lightSource = phaserGame.add.sprite(130, config.ceilingPosition + 1, 'light-source');
        lightSource.animations.add('lightSource');
        phaserGame.time.events.repeat(Phaser.Timer.SECOND * 2, 100500, () => {
            lightSource.animations.play('lightSource', 8);
        }, phaserGame);
    }
}

export {Lamp};
