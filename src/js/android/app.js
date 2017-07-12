import { phaserGame } from '../common/phaser/phaser-game';
import '../../css/style.css';

phaserGame.state.start('boot');
window.AndroidFullScreen.immersiveMode(() => {}, () => {});
