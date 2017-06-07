import {phaserGame} from './phaser-game';

class TextRenderer {
    constructor (phaserGame, avatarSpriteName = null) {
        this.textContent = null;
        this.phaserGame = phaserGame;

        this.textElement = phaserGame.add.bitmapText(43, 145, 'font-BooCity', '', 10);
        this.finishCallback = () => {};
        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;
        this.avatarSprite = null;

        this.wordDelay = 220;
        this.lineDelay = 500;
        this.finishDelay = 5000;
        this.maxLinesCount = 4;

        if (avatarSpriteName) {
            this.avatarSprite = phaserGame.add.sprite(2 + (35 - 24) / 2, 148, avatarSpriteName);
        }
    }

    render (text, finishCallback = () => {}) {
        this.textContent = text;
        this.finishCallback = finishCallback;
        this._nextLine();
    }
    
    _nextLine () {
        if (this.lineIndex === this.textContent.length) {
            this._scheduleDestroy(this.finishDelay, this.finishCallback);

            return;
        }

        if ((this.lineIndex + 2) > this.maxLinesCount) {
            let text = this.textElement.text.split('\n');
            text.shift();
            this.textElement.text = text.join('\n');
        }

        this.line = this.textContent[this.lineIndex].split(' ');
        this.wordIndex = 0;
        this.phaserGame.time.events.repeat(this.wordDelay, this.line.length, this._nextWord, this);
        this.lineIndex++;
    }

    _nextWord() {
        this.textElement.text = this.textElement.text.concat(this.line[this.wordIndex] + ' ');
        this.wordIndex++;
    
        if (this.wordIndex === this.line.length) {
            this.textElement.text = this.textElement.text.concat('\n');
            this.phaserGame.time.events.add(this.lineDelay, this._nextLine, this);
        }
    }

    _scheduleDestroy(finishDelay, finishCallback = () => {}) {
        this.phaserGame.time.events.add(finishDelay, () => {
            this.textElement.destroy();

            if (this.avatarSprite) {
                this.avatarSprite.destroy();
            }

            finishCallback();
        });
    }
}

let charBubble;
let textBubble;

let renderText = (text, avatarSpriteName = null, finishCallback = () => {}, destroyBubble = false) => {
    if (!charBubble && !textBubble) {
        charBubble = phaserGame.add.sprite(2, 145, 'char-bubble');
        textBubble = phaserGame.add.sprite(39, 145, 'text-bubble');
    }

    let textRenderer = new TextRenderer(phaserGame, avatarSpriteName);
    textRenderer.render(text, () => {
        if (destroyBubble) {
            textBubble.destroy();
            charBubble.destroy();
            textBubble = null;
            charBubble = null;
        }

        finishCallback();
    });
};

export {renderText};
