export default (phaserGame) => {
    phaserGame.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

    phaserGame.load.spritesheet('player', 'assets/img/character.png');
    phaserGame.load.spritesheet('coffee', 'assets/img/coffee.png');
    phaserGame.load.spritesheet('bug', 'assets/img/bug.png');
    phaserGame.load.spritesheet('crutch', 'assets/img/crutch.png');
    phaserGame.load.spritesheet('cactus', 'assets/img/cactus.png');

    phaserGame.load.image('sprite', 'assets/img/sprite.png');
    phaserGame.load.image('tree', 'assets/img/tree.png');
}
