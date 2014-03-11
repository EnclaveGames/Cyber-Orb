Ball.Game = function(game) {
	keys = null;
	ball = null;
	walls = null;
	timer = 0;
	totalTimer = 0;
	loop = null;
	firstRun = true;
	level = 0;
	sfx_bounce = null;
	maxLevels = 5;
	audio = true;
};
Ball.Game.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		panel = this.add.sprite(0, 0, 'panel');
		panel.body.immovable = true;

		walls = this.game.add.group();
		walls.add(panel);

		pauseButton = this.add.button(320-36-8, 8, 'button-pause', this.managePause, this);
		audioButton = this.add.button(320-36-8-36-8, 8, 'button-audio', this.manageAudio, this);
		audioButton.animations.add('true', [0], 10, true);
		audioButton.animations.add('false', [1], 10, true);
		audioButton.animations.play(audio);

		timerText = this.game.add.text(15, 15, "Time: "+timer, { font: "24px Arial", fill: "#e4beef" });
		levelText = this.game.add.text(120, 10, "Level: "+level, { font: "16px Arial", fill: "#e4beef" });
		totalTimeText = this.game.add.text(120, 30, "Total time: "+totalTimer, { font: "16px Arial", fill: "#e4beef" });

		hole = this.add.sprite((320-30)/2, 90, 'hole');
		hole.body.immovable = true;
		hole.anchor.setTo(0.5, 0.5);
		hole.body.setCircle(5,15,15);

		ball = this.add.sprite((320-24)/2, 450, 'ball');
		ball.anchor.setTo(0.5, 0.5);
		ball.body.bounce.setTo(0.3, 0.3);
		ball.body.setCircle(11, 12, 12);
		ball.body.linearDamping = 1;
		ball.body.collideWorldBounds = true;

		keys = this.game.input.keyboard.createCursorKeys();
		window.addEventListener("deviceorientation", this.handleOrientation, true);
		if(!loop) {
			loop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
			level = 1;
		}

		this.createLevel(level);

		sfx_bounce = this.game.add.audio('bounce');
	},
	createLevel: function(lvl) {
		// create levels manually
		// TODO: import from level editor
		switch(lvl) {
			case 1: {
				walls.create((320-131)/2, (480-33)/2, 'element-w').body.immovable = true;
				break;
			}
			case 2: {
				walls.create(60, 320, 'element-w').body.immovable = true;
				walls.create(191, 320, 'element-h').body.immovable = true;
				walls.create(52, 154, 'element-w').body.immovable = true;
				break;
			}
			case 3: {
				walls.create(220-34, 480-131, 'element-h').body.immovable = true;
				walls.create(105-34, 480-131, 'element-h').body.immovable = true;
				walls.create(0, 240, 'element-w').body.immovable = true;
				walls.create(131, 240, 'element-w').body.immovable = true;
				walls.create(200, 52, 'element-h').body.immovable = true;
				break;
			}
			case 4: {
				walls.create(110-34, 480-131, 'element-h').body.immovable = true;
				walls.create(110-34, 480-131-32, 'element-w').body.immovable = true;
				walls.create(0, 240, 'element-w').body.immovable = true;
				walls.create(320-131, 240, 'element-w').body.immovable = true;
				walls.create(30, 150, 'element-w').body.immovable = true;
				walls.create(131+30, 150, 'element-w').body.immovable = true;
				break;
			}
			case 5: {
				walls.create(220-32, 480-128, 'element-h').body.immovable = true;
				walls.create(92, 480-128-32, 'element-w').body.immovable = true;
				walls.create(0, 240, 'element-w').body.immovable = true;
				walls.create(128, 240, 'element-w').body.immovable = true;
				walls.create(256, 240, 'element-h').body.immovable = true;
				walls.create(180, 58, 'element-h').body.immovable = true;
				walls.create(52, 154, 'element-w').body.immovable = true;
				break;
			}
			default: {
				break;
			}
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
	manageAudio: function() {
		// turn on/off the audio
		audio =! audio;
		audioButton.animations.play(audio);
		console.log('audio: '+audio);
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
		sfx_bounce.play();
	},
	finishLevel: function() {
		if(level >= maxLevels) {
			alert('Congrats, game completed!');
			this.game.state.start('MainMenu');
		}
		else {
			alert('Congrats, level '+level+' completed!');
			totalTimer += timer;
			timer = 0;
			level++;
			totalTimeText.content = "Total time: "+totalTimer;
			levelText.content = "Level: "+level;
			this.game.state.start('Game');
		}
	},
	handleOrientation: function(e) {
		var x = e.gamma; // range [-90,90]
		var y = e.beta;  // range [-180,180]
		ball.body.velocity.x += x/2;
		ball.body.velocity.y += y;
	}
};