export default (resources, phaserGame, version) => {
    let processPath = (path, version) => {
        return `${path}?v=${version}`;
    };

    for (const type in resources) {
        if (!resources.hasOwnProperty(type)) {
            continue;
        }

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
