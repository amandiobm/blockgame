(function(){

    game = new Phaser.Game(500, 300);
    game.global = {
        levels: 3,
        maps: [
            [
                'xxxxxxxxxxxxxxxxxxxxxx',
                '!                    x',
                '!                    d',
                '!                    x',
                '!                    x',
                '!                    x',
                '!     c              x',
                '!                 o  x',
                '!     x   o          x',
                '!            x       x',
                '!     o   !    x     x',
                'xxxxxxxxxxxxxxxx!!!!!x'
            ], [
                'xxxxxxxxxxxxxxxxxxxxxx',
                'd                    x',
                'x                    x',
                'x                    x',
                'x                    x',
                'x                    x',
                'x                    x',
                'x                 o  x',
                'x     x   o    c     !',
                'x                    !',
                'x     o   !    x     !',
                'xxxxxxxxxxxxxxxx!!!!!!'
            ], [
                'xxxxxxxxxxxxxxxxxxxxxx',
                'x                    x',
                'x                    x',
                'x                    x',
                'x                    x',
                'x                    x',
                'x     c              x',
                'x                    x',
                'x     x              x',
                'x                    x',
                'x     o     x        x',
                'xxxxxx!!!xxxxxxxxxxxxx'
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