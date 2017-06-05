import {renderText} from '../phaser/render-text';

class AbstractCharacter {
    constructor() {
        this.characterSprite = null;
        this.avatarSpriteName = null;
    }

    say(text) {
        return new Promise((resolve) => {
            renderText(text, this.avatarSpriteName, () => {
                resolve();
            });
        });
    }

    spawn() {
        throw Error('Not implemented');
    }
}

export {AbstractCharacter};
