import Inventory from './inventory';

const MIN_HEALTH_POINTS = 0;
const MAX_HEALTH_POINTS = 5;

class Player {
    constructor() {
        this.inventory = new Inventory();
        this.health = 1;
        this.isPickedWeapon = true;
    }

    increaseHealth(number) {
        this.health = Math.min(MAX_HEALTH_POINTS, this.health + number);
    }

    decreaseHealth(number) {
        this.health = Math.max(MIN_HEALTH_POINTS, this.health - number);
    }
}

export {Player}
