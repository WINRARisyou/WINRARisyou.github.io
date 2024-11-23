function startSnakeGame() {
	const canvas = document.getElementById('snake-game');
	const context = canvas.getContext('2d');

	canvas.width = 400;
	canvas.height = 400;

	let snake = [{ x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 }];
	let dx = 0;
	let dy = 0; 
	let nextDirection = null;
	let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
	let score = 0;
	let changingDirection = false;
	let gracePeriod = false;
	let graceTimeout = null;
	let lastUpdateTime = 0;
	const updateInterval = 100;

	document.addEventListener('keydown', changeDirection);

	function changeDirection(event) {
		const LEFT_KEY = 37;
		const RIGHT_KEY = 39;
		const UP_KEY = 38;
		const DOWN_KEY = 40;

		if (changingDirection) return;

		const keyPressed = event.keyCode;
		const goingUp = dy === -20;
		const goingDown = dy === 20;
		const goingRight = dx === 20;
		const goingLeft = dx === -20;

		if (keyPressed === LEFT_KEY && !goingRight) {
			nextDirection = { dx: -20, dy: 0 };
		}
		if (keyPressed === UP_KEY && !goingDown) {
			nextDirection = { dx: 0, dy: -20 };
		}
		if (keyPressed === RIGHT_KEY && !goingLeft) {
			nextDirection = { dx: 20, dy: 0 };
		}
		if (keyPressed === DOWN_KEY && !goingUp) {
			nextDirection = { dx: 0, dy: 20 };
		}
	}

	function update() {
		if (gracePeriod) return;

		if (nextDirection) {
			dx = nextDirection.dx;
			dy = nextDirection.dy;
			nextDirection = null;
		}

		const head = { x: snake[0].x + dx, y: snake[0].y + dy };

		if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head, snake)) {
			gracePeriod = true;
			graceTimeout = setTimeout(() => {
				if (nextDirection) {
					dx = nextDirection.dx;
					dy = nextDirection.dy;
					nextDirection = null;
					gracePeriod = false;
				} else {
					resetGame();
				}
			}, 60);
			return;
		}

		snake.unshift(head);

		if (head.x === food.x && head.y === food.y) {
			food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
			score++;
			do {
				food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
			} while (snake.some(segment => food.x === segment.x && food.y === segment.y));
		} else {
			snake.pop();
		}

		changingDirection = false;
	}

	function collision(head, snake) {
		for (let i = 1; i < snake.length; i++) {
			if (head.x === snake[i].x && head.y === snake[i].y) return true;
		}
		return false;
	}

	function resetGame() {
		clearTimeout(graceTimeout);
		snake = [{ x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 }];
		dx = 0;
		dy = 0;
		nextDirection = null;
		food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
		score = 0;
		changingDirection = false;
		gracePeriod = false;
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = 'red';
		context.fillRect(food.x, food.y, 20, 20);

		context.fillStyle = 'lime';
		for (let i = 0; i < snake.length; i++) {
			context.fillRect(snake[i].x, snake[i].y, 20, 20);
		}

		context.fillStyle = "#21211C";
		context.font = '20px Arial';
		context.fillText(`Score: ${score}`, 10, canvas.height - 10);
	}

	function gameLoop(currentTime) {
		if (currentTime - lastUpdateTime > updateInterval) {
			update();
			draw();
			lastUpdateTime = currentTime;
		}
		requestAnimationFrame(gameLoop);
	}

	requestAnimationFrame(gameLoop);
}