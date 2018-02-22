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