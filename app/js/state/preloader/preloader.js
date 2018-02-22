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