import {renderText} from '../phaser/render-text';

class AbstractCharacter {
    constructor() {
        this.characterSprite = null;
        this.avatarSpriteName = null;
    }

    say(text) {
        renderText(text, this.avatarSpriteName);
    }

    spawn() {
        throw Error('Not implemented');
    }
}

export {AbstractCharacter};
