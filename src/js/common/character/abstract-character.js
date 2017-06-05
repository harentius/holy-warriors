import {renderText} from '../phaser/render-text';

class AbstractCharacter {
    constructor() {
        this.characterSprite = null;
        this.avatarSpriteName = null;
    }

    say(text, destroyBubble = false) {
        return new Promise((resolve) => {
            renderText(text, this.avatarSpriteName, () => {
                resolve();
            }, destroyBubble);
        });
    }

    spawn() {
        throw Error('Not implemented');
    }
}

export {AbstractCharacter};
