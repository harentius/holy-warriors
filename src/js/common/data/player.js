import Inventory from './inventory';

class Player {
    constructor() {
        this.inventory = new Inventory();
        this.healthPoints = 100;
        this.isPickedWeapon = true;
    }
}

export {Player}
