import Inventory from './inventory';

export default class Player
{
    constructor()
    {
        this.inventory = new Inventory();
        this.healthPoints = 100;
    }
}
