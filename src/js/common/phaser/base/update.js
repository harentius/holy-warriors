let jumpTimer = 0;

export default (phaserGame, phaserGameData, gameData) => {
    phaserGame.physics.arcade.collide(phaserGameData.player, phaserGameData.layers.world);
    phaserGame.physics.arcade.overlap(phaserGameData.player, phaserGameData.groups.coffee, collectCoffee, null, this);
    phaserGameData.player.body.velocity.x = 0;

    if (phaserGameData.keys.cursors.left.isDown) {
        phaserGameData.player.body.velocity.x = -150;
    } else if (phaserGameData.keys.cursors.right.isDown) {
        phaserGameData.player.body.velocity.x = 150;
    }

    if (phaserGameData.keys.jump.isDown && phaserGameData.player.body.onFloor() && phaserGame.time.now > jumpTimer)
    {
        phaserGameData.player.body.velocity.y = -350;
        jumpTimer = phaserGame.time.now + 250;
    }
}

function collectCoffee(player, coffee) {
    coffee.kill();
    console.log('collect')
}