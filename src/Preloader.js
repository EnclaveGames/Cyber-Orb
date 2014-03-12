Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#16181a';
		this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
		this.preloadBar = this.add.sprite((320-158)/2, (480-50)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('ball', 'img/ball.png');
		this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('button-start', 'img/button-start.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');

		this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);

		this.load.audio('bounce', ['audio/phaserUp3.ogg']);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};