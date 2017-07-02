let render = {
  debug: (phaserGame) => {
    return () => {
      phaserGame.debug.text(phaserGame.time.fps, 2, 14, "#ff0028");
    }
  },
  default: () => {
    return () => {
    }
  }
};

export default (phaserGame, config) => {
  return config.debug ? render.debug(phaserGame) : render.default();
}
