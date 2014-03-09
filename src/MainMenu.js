Ball.MainMenu = function(game) {};
Ball.MainMenu.prototype = {
	create: function() {
		title = this.game.add.text(
			64, 80, "Cyber Orb",
			{ font: "40px Arial", fill: "#404040", stroke: "#E4E4E4", strokeThickness: 5 }
		);
		this.startButton = this.add.button((320-110)/2, 480-48-160, 'button-start', this.startGame, this, 1, 0, 2);
		instructions = this.game.add.text(
			50, 400, "Use arrow keys on desktop, \n  accelerometer on mobile",
			{ font: "18px Arial", fill: "#404040", stroke: "#E4E4E4", strokeThickness: 3 }
		);
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};