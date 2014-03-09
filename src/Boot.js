var Ball = {};
Ball.Boot = function(game) {};
Ball.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'img/loading.png');
	},
	create: function() {
		this.game.input.maxPointers = 1;
		this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		this.game.stage.scale.pageAlignHorizontally = true;
		this.game.stage.scale.pageAlignVertically = true;
		this.game.stage.scale.setScreenSize(true);
		this.game.state.start('Preloader');
	}
};