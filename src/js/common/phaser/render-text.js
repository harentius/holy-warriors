import phaserGame from './game';

class TextRenderer
{
    constructor (phaserGame) {
        this.textContent = null;
        this.phaserGame = phaserGame;
        this.textBubble = phaserGame.add.sprite(2, 145, 'text-bubble');
        this.textElement = phaserGame.add.bitmapText(5, 145, 'font-BooCity', '', 10);
        this.finishCallback = () => {};
        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 120;
        this.lineDelay = 400;
        this.finishDelay = 2000;
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
            this.textBubble.destroy();
            this.textElement.destroy();
            finishCallback();
        });
    }
}

export default (text, finishCallback = () => {}) => {
    let textRenderer = new TextRenderer(phaserGame);
    textRenderer.render(text, finishCallback);
}
