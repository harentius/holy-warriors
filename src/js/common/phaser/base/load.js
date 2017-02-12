const resources = {
    tilemap: {
        tilemap: ['assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON],
    },
    spritesheet: {
        player: 'assets/img/character.png',
        coffee: 'assets/img/coffee.png',
        tape: 'assets/img/tape.png',
        bug: 'assets/img/bug.png',
        crutch: 'assets/img/crutch.png',
        cactus: 'assets/img/cactus.png',
        abyss: 'assets/img/abyss.png',
    },
    image: {
        sprite: 'assets/img/sprite.png',
        tree: 'assets/img/tree.png',
    }
};

export default (phaserGame, version) => {
    let processPath = (path, version) => {
        return `${path}?v=${version}`;
    };

    for (const type in resources) {
        for (const key in resources[type]) {
            if (!resources[type].hasOwnProperty(key)) {
                continue;
            }

            let args = [key];

            if (resources[type][key] instanceof Array) {
                resources[type][key][0] = processPath(resources[type][key][0]);
                args = args.concat(resources[type][key]);
            } else {
                args.push(processPath(resources[type][key], version));
            }

            phaserGame.load[type](...args);
        }
    }
}
