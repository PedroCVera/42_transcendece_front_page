export class Ball {
	constructor(game, xPos, yPos, radius) {
		this.game = game;
		this.x = xPos;
		this.y = yPos;
		this.radius = radius;
		this.speed = 0;
		this.maxSpeed = 4;
		this.cSpeed = this.maxSpeed;
		this.xDir = 1;
		this.yDir = 0.75;
	}
	draw(ctx)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
	}
	update(leftPaddle, rightPaddle)
	{
		if (this.x + this.xDir + this.radius >= this.game.width || this.x + this.xDir - this.radius <= 0)
		{
			this.xDir *= -1;
			this.x = this.game.width/2;
			this.y = this.game.height/2;
			this.cSpeed = this.maxSpeed;
		}

		if (this.y + this.radius >= this.game.height || this.y + this.radius - this.radius <= 0)
			this.yDir *= -1;
		if (this.y >= this.game.height)
			this.y = this.game.height - this.radius
		if (this.y <= 0)
			this.y = 0 + this.radius

		if (((this.y + this.radius >= leftPaddle.y && this.y - this.radius <= leftPaddle.y + leftPaddle.height)
			&& this.x + this.xDir - this.radius <= leftPaddle.x + leftPaddle.width) ||
			((this.y + this.radius >= rightPaddle.y && this.y - this.radius <= rightPaddle.y + rightPaddle.height)
			&& this.x + this.xDir + this.radius >= rightPaddle.x))
			{
				this.xDir *= -1;
				this.yDir = get_random_dir();
				if (this.cSpeed < 8)
					this.cSpeed += 1;
			}
		this.x += this.xDir * this.cSpeed;
		this.y += this.yDir * this.cSpeed;
	}
}

function get_random_dir(){
	let random1 = Math.random();
	if (random1 > 0.5)
			return Math.random();
	else
		return (Math.random() * -1);
}
