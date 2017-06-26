import {phaserGame} from '../phaser-game';
import {game} from '../../data/game';
import {EVENT_HEALTH_CHANGE, MAX_HEALTH_POINTS} from '../../data/player';

class HealthBar
{
    constructor() {
        this.playerData = game.playerData;
    }

    showAndWatch() {
        this._renderHealth(this.playerData.health);
        this.playerData.on(EVENT_HEALTH_CHANGE, () => {
            this._renderHealth(this.playerData.health);
        });
    }

    _renderHealth(health) {
        for (let i = 1; i <= MAX_HEALTH_POINTS; i++) {
            let sprite = phaserGame.add.sprite(2 + (i - 1) * 10, 2, 'hearts');
            sprite.frame = ~~!(health >= i);
        }
    }
}

export {HealthBar};
