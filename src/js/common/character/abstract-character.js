import renderText from '../phaser/render-text';

export default class {
    constructor() {
        this.characterSprite = null
        this.avatar = null
    }

    say(text) {
        renderText(text);
    }

    spawn() {
        throw Error('Not implemented');
    }
}
