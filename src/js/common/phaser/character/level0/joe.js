import {AbstractCharacter} from './../abstract-character';
import {phaserGame} from '../../phaser-game'
import {config} from '../../../config';

class Joe extends AbstractCharacter {
    constructor() {
        super();
        this.characterSprite = null;
        this.avatarSpriteName = 'developer-avatar';
    }

    spawn() {
        this.characterSprite = phaserGame.add.sprite(103, config.floorPosition - 29, 'developer-behind-desk');
        this.characterSprite.animations.add('typing');
        this.characterSprite.animations.play('typing', 8, true);
    }

    surprise() {
        this.characterSprite.destroy();
        phaserGame.add.sprite(103, config.floorPosition - 29, 'developer-behind-desk-surprised');
    }
}

export {Joe};
