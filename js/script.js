let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

let score = 0;
//pics
bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';
//sound
let fly = new Audio();
let score_audio = new Audio();
fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';


let gap = 90;
let xPos = 10;
let yPos = 150;
let grav = 1;


let pipe = [];
pipe[0] = {
	x: canvas.width,
	y: 0,
}

function draw() {
	ctx.drawImage(bg, 0, 0);
	for (let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		pipe[i].x--;
		if (pipe[i].x == 125) {
			pipe.push({
				x: canvas.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}

		if (xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canvas.height - fg.height) {
			location.reload();
		}
		if (pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}
	ctx.drawImage(bird, xPos, yPos);
	ctx.drawImage(fg, 0, canvas.height - fg.height);

	yPos += grav;
	ctx.fillStyle = 'black';
	ctx.font = '20px Verdana';
	ctx.fillText('score: ' + score, 10, canvas.height - 20);

	requestAnimationFrame(draw);
}
pipeBottom.onload = draw;

document.addEventListener('keydown', moveUp);
function moveUp() {
	yPos -= 20;
	fly.play();
}