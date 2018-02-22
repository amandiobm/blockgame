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
    },

    credits: function () {
        this.state.start('Credits');
    }

};