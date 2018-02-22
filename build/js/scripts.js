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
Finish = function () {};

Finish.prototype = {

    create: function () {

        var gameOver = this.add.bitmapText(this.world.centerX, 80, 'eightbitwonder', 'GAME OVER', 32);
        gameOver.anchor.set(0.5);

        var backText = this.add.bitmapText(this.world.centerX, this.world.centerY + 30, 'eightbitwonder', 'VOLTAR', 10);
        backText.anchor.set(0.5);
        backText.inputEnabled = true;
        backText.input.useHandCursor = true;
        backText.events.onInputDown.add(this.mainMenu, this);

        var createdBy = this.add.bitmapText(this.world.centerX, 260, 'eightbitwonder', 'CRIADO POR', 8);
        createdBy.anchor.set(0.5);
        var authorText = this.add.bitmapText(this.world.centerX, 280, 'eightbitwonder', 'DOUGLAS LIRA', 10);
        authorText.anchor.set(0.5);


    },

    mainMenu: function () {
        this.state.start('MainMenu');
    }

};
MainMenu = function (game) {};

MainMenu.prototype = {

    create: function () {

        var titleLabel = this.add.bitmapText(this.world.centerX, 100, 'eightbitwonder', 'BLOCK GAME', 32);
        titleLabel.anchor.set(0.5);

        var playText = this.add.bitmapText(this.world.centerX, 205, 'eightbitwonder', 'JOGAR', 12);
        playText.anchor.set(0.5);
        playText.inputEnabled = true;
        playText.input.useHandCursor = true;
        playText.events.onInputDown.add(this.levelSelection, this);

    },

    levelSelection: function () {
        this.state.start('PlayLevel', true, false, 'level0');
    }

};
PlayLevel = function (game) {};

PlayLevel.prototype = {

    init: function(level) {

        this.countCoin = 0;
        this.takeSumCoin = 0;
        this.level = parseInt(level.substring(5, level.length));

    },

    create: function() {

        this.cursor = this.input.keyboard.createCursorKeys();
        this.player = this.add.sprite(70, 100, 'player');
        this.player.body.gravity.y = 600;

        this.walls = game.add.group();
        this.door = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.chest = game.add.group();

        this.createMap();

    },

    update: function() {

        this.physics.arcade.collide(this.player, this.walls);
        this.physics.arcade.collide(this.player, this.door);
        this.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        this.physics.arcade.overlap(this.player, this.chest, this.nextLevel, null, this);

        if (this.cursor.left.isDown)
            this.player.body.velocity.x = -200;
        else if (this.cursor.right.isDown)
            this.player.body.velocity.x = 200;
        else
            this.player.body.velocity.x = 0;

        if (this.cursor.up.isDown && this.player.body.touching.down)
            this.player.body.velocity.y = -250;

    },

    // EXTRA

    takeCoin: function(player, coin) {
        coin.kill();
        this.takeSumCoin++;
        if(this.takeSumCoin === this.countCoin){
            this.createChest();
        }
    },

    restart: function() {
        this.state.start('PlayLevel', true, false, 'level' + this.level);
    },

    nextLevel: function () {
        var nextLevel = this.level+1;
        if(nextLevel < 3){
            this.state.start('PlayLevel', true, false, 'level' + nextLevel);
        } else {
            this.state.start('Finish');
        }
    },

    createChest: function(){

        var loadMap = game.global.maps[this.level];
        for (var i = 0; i < loadMap.length; i++) {
            for (var j = 0; j < loadMap[i].length; j++) {
                if (loadMap[i][j] === 'c') {
                    var chest = game.add.sprite(20*j, 20*i, 'chest');
                    this.chest.add(chest);
                    var ty = chest.y;
                    this.add.tween(chest).to({y: ty-10}, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Default).to({y: ty}, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Default).loop().start();
                }
            }
        }

    },

    createMap: function(){

        var loadMap = game.global.maps[this.level];

        for (var i = 0; i < loadMap.length; i++) {
            for (var j = 0; j < loadMap[i].length; j++) {

                if (loadMap[i][j] === 'x') {
                    var wall = game.add.sprite(20*j, 20*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                }

                else if (loadMap[i][j] === 'o') {
                    var coin = game.add.sprite(20*j, 20*i, 'coin');
                    this.coins.add(coin);
                    this.countCoin++;
                }

                else if (loadMap[i][j] === '!') {
                    var enemy = game.add.sprite(20*j, 20*i, 'enemy');
                    this.enemies.add(enemy);
                }

                else if (loadMap[i][j] === 'd') {
                    var door = game.add.sprite(20*j, 20*i, 'door');
                    this.door.add(door);
                }
            }
        }
    }

};
Preloader = function (game) {};

Preloader.prototype = {

    preload: function () {
        var loadingLabel = this.add.bitmapText(this.world.centerX, this.world.centerY - 20, 'eightbitwonder', 'LOADING', 20);
        loadingLabel.anchor.set(0.5);
        this.loadingText = this.add.bitmapText(this.world.centerX, this.world.centerY + 20, 'eightbitwonder', '0', 20);
        this.loadingText.anchor.set(0.5);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.path = 'assets/';
        this.load.images(['coin', 'chest', 'door', 'enemy', 'player', 'wall']);
    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.text = progress;
    },

    update: function () {
        this.state.start('MainMenu');
    },

    shutdown: function () {
        this.loadingText = null;
    }
};
(function(){

    game = new Phaser.Game(540, 320);
    game.global = {
        levels: 3,
        maps: [
            [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                '!                         x',
                '!                         x',
                '!                         x',
                '!                         x',
                '!                         x',
                '!                         d',
                '!     o                   d',
                '!    xxx                  x',
                '!            o            x',
                '!     c     xxx           x',
                '!                   o     x',
                '!     x   o        xx     x',
                '!                         x',
                '!     o   !    x          x',
                'xxxxxxxxxxxxxxxx!!!!!!!!!!x'
            ], [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'd                         x',
                'd                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                 o       x',
                'x     x   o    c          !',
                'x                         !',
                'x     o   !    x          !',
                'xxxxxxxxxxxxxxxx!!!!!!!!!!!'
            ], [
                'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x                         x',
                'x     c                   x',
                'x                         x',
                'x     x                   x',
                'x                         x',
                'x     o     x             x',
                'xxxxxx!!!xxxxxxxxxxxxxxxxxx'
            ]
        ]
    };

    game.state.add('Boot', Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('MainMenu', MainMenu);
    game.state.add('PlayLevel', PlayLevel);
    game.state.add('Finish', Finish);
    game.state.start('Boot');

})();