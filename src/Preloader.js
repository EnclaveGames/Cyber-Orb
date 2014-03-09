Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#475B8D';
		this.preloadBar = this.add.sprite((320-190)/2, (480-45)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('ball', 'img/ball.png');
		this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-128w.png');
		this.load.image('element-h', 'img/element-128h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('button-start', 'img/button-start.png');
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};