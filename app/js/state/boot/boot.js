Boot = function (game) {};

Boot.prototype = {

    init: function () {
        this.world.enableBody = true;
        this.scale.updateLayout(true);
    },

    preload: function () {
        this.load.bitmapFont('eightbitwonder','assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
        this.load.image('player', 'assets/player.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.image('door', 'assets/door.png');
    },

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preloader');
    }
};