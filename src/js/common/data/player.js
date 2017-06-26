import Inventory from './inventory';

const MIN_HEALTH_POINTS = 0;
const MAX_HEALTH_POINTS = 5;

const EVENT_HEALTH_CHANGE = 'health-change';

class Player {
    constructor() {
        this.inventory = new Inventory();
        this.health = 1;
        this.isPickedWeapon = false;
        this.healthWisible = false;
        this.events = {};
    }

    increaseHealth(number) {
        this.health = Math.min(MAX_HEALTH_POINTS, this.health + number);
        this._trigger(EVENT_HEALTH_CHANGE, this.health);
    }

    decreaseHealth(number) {
        this.health = Math.max(MIN_HEALTH_POINTS, this.health - number);
        this._trigger(EVENT_HEALTH_CHANGE, this.health);
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }

    _trigger(event, args) {
        for (let callback in this.events[event]) {
            callback(...args);
        }
    }
}

export {Player, EVENT_HEALTH_CHANGE, MIN_HEALTH_POINTS, MAX_HEALTH_POINTS}
