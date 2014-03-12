Ball.StoryHowto = function(game) {
	// buttonContinue = null;
	// state = null;
};
Ball.StoryHowto.prototype = {
	create: function() {
		// this.showStory();
		this.showHowto();
	},
	// showStory: function() {
	// 	this.game.add.sprite(0, 0, 'background');
	// 	this.game.add.sprite(0, 0, 'screen-story');
	// 	this.state = 'story';
	// 	this.buttonContinue = this.add.button(-179, 480-67-35, 'button-continue', this.showHowto, this);
	// 	this.game.add.tween(this.buttonContinue).to({x: (320-179)/2}, 300, Phaser.Easing.Exponential.Out, true, 0, false);
	// },
	showHowto: function() {
		// this.game.add.sprite(0, 0, 'background');
		// this.game.add.sprite(0, 0, 'screen-howto');
		// this.state = 'howto';
		this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this);
		// this.game.add.tween(this.buttonContinue).to({x: (320-179)/2}, 300, Phaser.Easing.Exponential.Out, true, 0, false);
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};