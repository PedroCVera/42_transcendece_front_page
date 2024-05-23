export class Paddle {
	constructor(game, xPos, yPos, width, height) {
		this.game = game;
		this.x = xPos;
		this.y = yPos;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.maxSpeed = 7;
	}
	draw(context)
	{
		context.fillRect(this.x, this.y, this.width, this.height);
	}
	update(keys)
	{
		this.speed = keys.vertical() * this.maxSpeed;
		console.log(this.speed)
		this.y += this.speed;
		if (this.y < 0)
			this.y = 0;
		else if (this.y > this.game.height - this.height)
			this.y = this.game.height - this.height;
	}
}