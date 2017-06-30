import {AbstractItem} from '../abstract-item'
import {game} from '../../../data/game';

class Coffee extends AbstractItem {
    constructor() {
        super();
        this.spriteName = 'coffee';
    }

    collect(item) {
        if (!super.collect(item)) {
            return;
        }

        let playerData = game.playerData;
        playerData.increaseHealth();
    }
}

export {Coffee};
