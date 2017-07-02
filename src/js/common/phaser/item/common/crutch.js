import {AbstractItem} from '../abstract-item'
import {game} from '../../../data/game';

class Crutch extends AbstractItem {
  constructor() {
    super();
    this.spriteName = 'crutch';
  }

  collect(item) {
    if (!super.collect(item)) {
      return;
    }

    let playerData = game.playerData;
  }
}

export {Crutch};
