import {AbstractCharacter} from './../abstract-character';
import {phaserGame} from '../../phaser-game'
import {config} from '../../../config';

class Stranger extends AbstractCharacter {
    constructor() {
        super();
        this.avatarSpriteName = 'stranger-avatar';
    }

    spawn() {
        this.characterSprite = phaserGame.add.sprite(29, config.floorPosition - 35, 'stranger');
        this.characterSprite.animations.add('smoking');

        // Smoke
        phaserGame.time.events.repeat(Phaser.Timer.SECOND * 3, 100500, () => {
            this.characterSprite.animations.play('smoking', 8);
        }, phaserGame);
    }

    walkToPlayer() {
        if (!this.characterSprite) {
            throw Error("Invoked action method 'walkToPlayer' without spawning Stranger");
        }

        return new Promise((resolve) => {
            // Stranger walk
            phaserGame.time.events.add(Phaser.Timer.SECOND * 3, () => {
                let strangerWalk = phaserGame.add.sprite(29, config.floorPosition - 40, 'stranger-walk');
                this.characterSprite.visible = false;
                strangerWalk.animations.add('stranger-walk');
                strangerWalk.animations.play('stranger-walk', 6, true);
                phaserGame.time.events.repeat(Phaser.Timer.SECOND / 30, 60, () => {
                    strangerWalk.x += 1;
                });
                phaserGame.time.events.add(Phaser.Timer.SECOND * 2, () => {
                    this.characterSprite.x = 29 + 10 * 6;
                    strangerWalk.destroy();
                    this.characterSprite.visible = true;
                    resolve();
                });
            });
        });
    }

    openCase() {
        if (!this.characterSprite) {
            throw Error("Invoked action method 'openCase' without spawning Stranger");
        }

        this.characterSprite.visible = false;
        let strangerOpenCase = phaserGame.add.sprite(29 + 10 * 6, config.floorPosition - 35, 'stranger-open-case');
        strangerOpenCase.animations.add('stranger-open-case');
        strangerOpenCase.animations.play('stranger-open-case', 8);
    }
}

export {Stranger};
