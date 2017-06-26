let game = null;

class Game {
    constructor() {
        this.level = 0;
        this.playerData = null;
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
