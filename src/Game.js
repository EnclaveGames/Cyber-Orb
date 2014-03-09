Ball.Game = function(game) {
	keys = null;
	ball = null;
	walls = null;
	timer = 0;
	totalTimer = 0;
	loop = null;
	firstRun = true;
	level = 0;
};
Ball.Game.prototype = {
	create: function() {
		panel = this.add.sprite(0, 0, 'panel');
		panel.body.immovable = true;

		walls = this.game.add.group();
		walls.add(panel);

		pause = this.add.button(320-48-10, 5, 'button-pause', this.managePause, this);
		timerText = this.game.add.text(15, 20, "Time: "+timer, { font: "24px Arial", fill: "#333333" });
		levelText = this.game.add.text(140, 13, "Level: "+level, { font: "16px Arial", fill: "#333333" });
		totalTimeText = this.game.add.text(140, 33, "Total time: "+totalTimer, { font: "16px Arial", fill: "#333333" });

		hole = this.add.sprite((320-22)/2, 90, 'hole');
		hole.body.immovable = true;
		hole.anchor.setTo(0.5, 0.5);
		hole.body.setCircle(5,15,15);

		ball = this.add.sprite((320-22)/2, 450, 'ball');
		ball.anchor.setTo(0.5, 0.5);
		ball.body.bounce.setTo(0.3, 0.3);
		ball.body.setCircle(10, 11, 11);
		ball.body.linearDamping = 1;
		ball.body.collideWorldBounds = true;
		
		walls.create(220-32, 480-128, 'element-h').body.immovable = true;
		walls.create(92, 480-128-32, 'element-w').body.immovable = true;
		walls.create(0, 240, 'element-w').body.immovable = true;
		walls.create(128, 240, 'element-w').body.immovable = true;
		walls.create(256, 240, 'element-h').body.immovable = true;
		walls.create(180, 58, 'element-h').body.immovable = true;
		walls.create(52, 154, 'element-w').body.immovable = true;

		keys = this.game.input.keyboard.createCursorKeys();
		window.addEventListener("deviceorientation", this.handleOrientation, true);
		if(!loop) {
			loop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
			level = 1;
		}
	},
	updateCounter: function() {
		timer++;
		timerText.content = "Time: "+timer;
		totalTimeText.content = "Total time: "+(totalTimer+timer);
	},
	managePause: function() {
		this.game.paused =! this.game.paused;
	},
	update: function() {
		var force = 10;
		if(keys.left.isDown) {
			ball.body.velocity.x -= force;
		}
		else if(keys.right.isDown) {
			ball.body.velocity.x += force;
		}
		if(keys.up.isDown) {
			ball.body.velocity.y -= force;
		}
		else if(keys.down.isDown) {
			ball.body.velocity.y += force;
		}

		this.game.physics.collide(ball, walls, this.wallCollision, null, this);
		this.game.physics.collide(ball, hole, this.finishLevel, null, this);
	},
	wallCollision: function() {
		// boom!
	},
	finishLevel: function() {
		alert('HOLE!');
		totalTimer += timer;
		timer = 0;
		level++;
		totalTimeText.content = "Total time: "+totalTimer;
		levelText.content = "Level: "+level;
		this.game.state.start('Game');
	},
	handleOrientation: function(e) {
		var x = e.gamma; // range [-90,90]
		var y = e.beta;  // range [-180,180]
		ball.body.velocity.x += x/2;
		ball.body.velocity.y += y;
	}
};