import {Inventory} from './inventory';
import {Item} from './item'

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
    this.eventsOnce = {};
  }

  increaseHealth(number = 1) {
    this.health = Math.min(MAX_HEALTH_POINTS, this.health + number);
    this._trigger(EVENT_HEALTH_CHANGE, this.health);
  }

  decreaseHealth(number = 1) {
    this.health = Math.max(MIN_HEALTH_POINTS, this.health - number);
    this._trigger(EVENT_HEALTH_CHANGE, this.health);
  }

  addItem(name, count = 1) {
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


  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  once(event, callback) {
    if (!this.eventsOnce[event]) {
      this.eventsOnce[event] = [];
    }

    this.eventsOnce[event].push(callback);
  }

  _trigger(event, args) {
    if (this.events[event]) {
      for (let callback of this.events[event]) {
        callback(...args);
      }
    }

    if (this.eventsOnce[event]) {
      for (let callback of this.eventsOnce[event]) {
        callback(...args);
      }
    }

    this.eventsOnce[event] = [];
  }
}

export {Player, EVENT_HEALTH_CHANGE, MIN_HEALTH_POINTS, MAX_HEALTH_POINTS}
