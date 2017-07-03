import {Inventory} from './inventory';
import {Item} from './item';
import EventClass from 'event-class';
const MIN_HEALTH_POINTS = 0;
const MAX_HEALTH_POINTS = 5;

const EVENT_HEALTH_CHANGE = 'health-change';
const EVENT_PICK_UP_WEAPON = 'pick-up-weapon';

class Player {
  constructor() {
    this.inventory = new Inventory();
    this.eventDispatcher = new EventClass();
    this.health = 1;
    this.isPickedWeapon = false;
    this.healthWisible = false;
  }

  increaseHealth(number = 1) {
    this.health = Math.min(MAX_HEALTH_POINTS, this.health + number);
    this.eventDispatcher.trigger(EVENT_HEALTH_CHANGE, this.health);
  }

  decreaseHealth(number = 1) {
    this.health = Math.max(MIN_HEALTH_POINTS, this.health - number);
    this.eventDispatcher.trigger(EVENT_HEALTH_CHANGE, this.health);
  }

  addItem(name, count = 1) {
    if (name === 'crutch') {
      this.eventDispatcher.trigger(EVENT_PICK_UP_WEAPON);
    }

    if (!this.inventory.items[name]) {
      this.inventory.items[name] = new Item(name);
    }

    this.inventory.items[name].count += count;
  }

  removeItem(name, count = 1) {
    if (!this.inventory.items[name]) {
      // TODO: is this an error?
      return;
    }

    this.inventory.items[name].count -= count;
  }
}

export {Player, EVENT_HEALTH_CHANGE, EVENT_PICK_UP_WEAPON, MIN_HEALTH_POINTS, MAX_HEALTH_POINTS}
