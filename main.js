import {Paddle} from "./paddle.js"
import {InputHandler} from "./input.js"
import {Ball} from "./ball.js"


class Game {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.paddleHeight = 70;
		this.paddleWidth = 10;
		this.paddlePadding = 5;
		this.ballRadius = 6;
		this.ball = new Ball(this, this.width/2, this.height/2, this.ballRadius);
		this.leftPaddle = new Paddle(this, this.paddlePadding, this.height/2 - this.paddleHeight/2, this.paddleWidth, this.paddleHeight);
		this.rightPaddle = new Paddle(this, this.width - this.paddleWidth - this.paddlePadding, this.height/2 - this.paddleHeight/2, this.paddleWidth, this.paddleHeight);
		this.leftInput = new InputHandler("w", "s");
		this.rightInput = new InputHandler("ArrowUp", "ArrowDown");
	}
	update(leftInput, rightInput){
		this.leftPaddle.update(this.leftInput);
		this.rightPaddle.update(this.rightInput);
		this.ball.update(this.leftPaddle, this.rightPaddle);
	}
	draw(context){
		context.fillStyle = "white";
		context.fillRect(0,0, this.width, this.height);
		context.fillStyle = "black";

		for (let y = 8; y < this.height; y += 24) {
			context.fillRect(this.width / 2 - 1, y, 2, 8); // by this order: (center of the screen, I = position(y), 2 = width, 12.5 = height)
		}

		this.ball.draw(context);
		this.leftPaddle.draw(context);
		this.rightPaddle.draw(context);
		
	}
}

class IdleGame{
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.paddleHeight = 70;
		this.paddleWidth = 10;
		this.paddlePadding = 5;
		this.ballRadius = 6;
		this.ball = new Ball(this, this.width/2, this.height/2, this.ballRadius);
		this.leftPaddle = new Paddle(this, this.paddlePadding, this.height/2 - this.paddleHeight/2, this.paddleWidth, this.paddleHeight);
		this.rightPaddle = new Paddle(this, this.width - this.paddleWidth - this.paddlePadding, this.height/2 - this.paddleHeight/2, this.paddleWidth, this.paddleHeight);
		this.leftInput = new InputHandler("w", "s");
		this.rightInput = new InputHandler("ArrowUp", "ArrowDown");
	}
	update(){
		if (this.ball.y < this.height - 35 && this.ball.y > 35){
			this.leftPaddle.y = this.ball.y - 35
			this.rightPaddle.y = this.ball.y - 35
		}
		this.ball.update(this.leftPaddle, this.rightPaddle);
	}
	draw(context){
		context.fillStyle = "black"; // Adjust the alpha value (0.3) for the desired level of transparency
		context.fillRect(0,0, this.width, this.height);
		
		context.fillStyle = "white"
		for (let y = 8; y < this.height; y += 24) {
			context.fillRect(this.width / 2 - 1, y, 2, 8); // by this order: (center of the screen, I = position(y), 2 = width, 12.5 = height)
		}
		// context.fillStyle = "white";


		this.ball.draw(context);
		this.leftPaddle.draw(context);
		this.rightPaddle.draw(context);
		
	}
}

window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas1')
	const ctx = canvas.getContext("2d");
	
	const idle_game = new IdleGame(canvas.width, canvas.height);
	const game = new Game(canvas.width, canvas.height);
	let flag = 0


	if (game.leftInput.keys)
		animate(0);
	else
		game.animate(0) ;
	
	
	function animate() {

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		requestAnimationFrame(animate);
		if (game.leftInput.keys != 0 || game.rightInput.keys != 0){
			flag = 1
		}
		if (flag == 0){
			idle_game.update();
			idle_game.draw(ctx);
		}
		else
		{
			game.update();
			game.draw(ctx);
		}
	}

});
