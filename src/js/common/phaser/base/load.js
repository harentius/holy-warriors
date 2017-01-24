export default (game) => {
    game.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.spritesheet('player', 'assets/img/character.png');
    game.load.spritesheet('coffee', 'assets/img/coffee.png');
    game.load.spritesheet('bug', 'assets/img/bug.png');
    game.load.spritesheet('crutch', 'assets/img/crutch.png');
    game.load.spritesheet('cactus', 'assets/img/cactus.png');

    game.load.image('sprite', 'assets/img/sprite.png');
    game.load.image('tree', 'assets/img/tree.png');
}
