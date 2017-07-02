import {Player as PlayerData} from './player';

let game = null;

class Game {
  constructor() {
    this.level = 0;
    this.playerData = new PlayerData();
  }

  //TODO: set up load/save
  save() {

  }

  load() {

  }
}

if (!game) {
  game = new Game();
}

export {game};
