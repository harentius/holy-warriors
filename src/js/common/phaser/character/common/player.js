import {AbstractCharacter} from './../abstract-character';
import {phaserGame} from '../../phaser-game'
import {game} from '../../../data/game';

const ACTION_IDLE = 'idle';
const ACTION_WALK = 'walk';

const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';

class Player extends AbstractCharacter {
    constructor() {
        super();
        this._scheduledTimer = null;
        this.playerData = game.playerData;
        this.jumpTimer = 0;
    }

    spawn(x = 100) {
        this.avatarSpriteName = 'developer-avatar';
        this.action = ACTION_IDLE;
        this.direction = DIRECTION_RIGHT;
        this.characterSprite = phaserGame.add.sprite(x, 102, 'player', 6);

        this.characterSprite.animations.add('walk-right', [...(new Array(5)).keys()], 12, false);
        this.characterSprite.animations.add('walk-left', [6, 7, 8, 9, 10, 11], 12, false);

        this.characterSprite.animations.add('idle-right-start', [12]);
        this.characterSprite.animations.add('idle-left-start', [18]);

        this.characterSprite.animations.add('idle-right', [12, 13, 14, 15, 16, 17], 8, true);
        this.characterSprite.animations.add('idle-left', [18, 19, 20, 21, 22, 23], 8, true);
        this.characterSprite.animations.play('idle-right');
        phaserGame.physics.enable(this.characterSprite, Phaser.Physics.P2JS);
        this.characterSprite.body.setRectangle(14, 33);
        this.characterSprite.body.collideWorldBounds = true;
        this.characterSprite.body.fixedRotation = true;
        this.collisionGroup = phaserGame.physics.p2.createCollisionGroup();
        this.characterSprite.body.setCollisionGroup(this.collisionGroup);
    }

    walkStop() {
        if (this.action !== ACTION_WALK) {
            return;
        }

        this.characterSprite.body.velocity.x = 0;
        this.characterSprite.animations.stop();

        if (this.direction === DIRECTION_RIGHT) {
            this.characterSprite.animations.play('idle-right-start');
            this._scheduleIdleAnimation('idle-right');
        } else if (this.direction === DIRECTION_LEFT) {
            this.characterSprite.animations.play('idle-left-start');
            this._scheduleIdleAnimation('idle-left');
        }

        this.action = ACTION_IDLE;
    }

    walkRight() {
        this.characterSprite.animations.play('walk-right');
        this.characterSprite.body.velocity.x = 70;
        this.direction = DIRECTION_RIGHT;
        this.action = ACTION_WALK;
    }

    walkLeft() {
        this.characterSprite.animations.play('walk-left');
        this.characterSprite.body.velocity.x = -70;
        this.direction = DIRECTION_LEFT;
        this.action = ACTION_WALK;
    }

    jump() {
        if (!(phaserGame.time.now > this.jumpTimer && this._checkIfCanJump())) {
            return;
        }

        this.characterSprite.body.moveUp(120);
        this.jumpTimer = phaserGame.time.now + 350;
    }

    pickUpWeapon() {
        if (this.playerData.isPickedWeapon) {
            throw Error('Inwoked pickUpWeapon, but it is already picked up');
        }

        // this.characterSprite.animations.add('walk-right', [...(new Array(5)).keys()], 12, false);
        // this.characterSprite.animations.add('walk-left', [6, 7, 8, 9, 10, 11], 12, false);
        //
        // this.characterSprite.animations.add('idle-right-start', [24]);
        // this.characterSprite.animations.add('idle-left-start', [30]);
        //
        // this.characterSprite.animations.add('idle-right', [24, 25, 26, 27, 28, 29], 8, true);
        // this.characterSprite.animations.add('idle-left', [30, 31, 32, 33, 34, 35], 8, true);
    }

    _scheduleIdleAnimation(type) {
        if (this._scheduledTimer) {
            phaserGame.time.events.remove(this._scheduledTimer);
        }

        this._scheduledTimer = phaserGame.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
            this.characterSprite.animations.play(type);
        });
    }

    _checkIfCanJump() {
        let yAxis = p2.vec2.fromValues(0, 1);
        let result = false;

        for (let i = 0; i < phaserGame.physics.p2.world.narrowphase.contactEquations.length; i++) {
            let c = phaserGame.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === this.characterSprite.body.data || c.bodyB === this.characterSprite.body.data) {
                let d = p2.vec2.dot(c.normalA, yAxis);

                if (c.bodyA === this.characterSprite.body.data) {
                    d *= -1;
                }

                if (d > 0.5) {
                    result = true;
                }
            }
        }

        return result;
    }
}

export {Player};
