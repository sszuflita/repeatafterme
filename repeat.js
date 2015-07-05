var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var player = {
	width : 50,
	height : 50,
	x : 0,
	y : 0,
	xVel : 0,
	yVel : 0,
	xAcc : 0,
	yAcc : 0
	};

var dt = 1;

var jumpVel = 5;
var horUnit = 1;

var objects = [player];

var keysPressed = {
	up : false,
	down : false,
	left : false,
	right : false
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawObject(object) {
	ctx.beginPath();
	ctx.arc(object.x, object.y, object.width, 0, 2*Math.PI);
	ctx.stroke();
}

function updateObjectLocation(object) {
	object.x += dt * object.xVel;
	object.xVel += dt * object.xAcc
	object.y += dt * object.yVel;
	object.yVel += dt * object.yAcc;
}

function update() {
	clearCanvas();
	for (var i = 0; i < objects.length; i++) {
		object = objects[i];
		updateObjectLocation(object);
		drawObject(object);
	}

	/* update player specifically */
	if (keysPressed.up) {
		player.yVel += jumpVel;
	}
	if (keysPressed.right) {
		player.x += dt * horUnit;
	}
	if (keysPressed.left) {
		player.x -= dt * horUnit;
	}
}

var upKeyCode = 87;
var downKeyCode = 83;
var leftKeyCode = 65;
var rightKeyCode = 68;


function handleKeyDown(event) {
	switch (event.keyCode) {
		case upKeyCode:
			keysPressed.up = true;
			break;
		case downKeyCode:
			keysPressed.down = true;
			break;
		case rightKeyCode:
			keysPressed.right = true;
			break;
		case leftKeyCode:
			keysPressed.left = true;
			break;
		default:
			break;
	}
}

function handleKeyUp(event) {
	switch (event.keyCode) {
		case upKeyCode:
			keysPressed.up = false;
			break;
		case downKeyCode:
			keysPressed.down = false;
			break;
		case rightKeyCode:
			keysPressed.right = false;
			break;
		case leftKeyCode:
			keysPressed.left = false;
			break;
		default:
			break;
	}
}

window.addEventListener( "keydown", handleKeyDown, true);
window.addEventListener( "keyup", handleKeyUp, true);


setInterval(update, dt);

