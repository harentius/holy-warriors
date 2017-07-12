const load = (resources, phaserGame) => {
  const processPath = (path) => `${path}?v=${ASSET_VERSION}`;

  Object.entries(resources).forEach((typeEntry) => {
    const type = typeEntry[0];

    Object.entries(typeEntry[1]).forEach((entry) => {
      let args = [entry[0]];

      if (entry[1] instanceof Array) {
        // eslint-disable-next-line
        entry[1][0] = processPath(entry[1][0]);
        args = args.concat(entry[1]);
      } else {
        args.push(processPath(entry[1]));
      }

      phaserGame.load[type](...args);
    });
  });
};

export { load };
