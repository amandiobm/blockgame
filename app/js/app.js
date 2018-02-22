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