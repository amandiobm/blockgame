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