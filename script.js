const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

const snake = {
    x: 200,
    y: 200,
    dx: 20,
    dy: 0,
    cells: [],
    maxCells: 4
};

const apple = {
    x: 300,
    y: 300
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
    snake.x = 200;
    snake.y = 200;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = 20;
    snake.dy = 0;
    apple.x = getRandomInt(0, 20) * 20;
    apple.y = getRandomInt(0, 20) * 20;
    score = 0;
    document.getElementById('score').textContent = `Pontos: ${score} | Pontuação mais alta: ${highScore}`;
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    if (++count < 4) {
        return;
    }
    
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snake.x += snake.dx;
    snake.y += snake.dy;
    
    if (snake.x < 0) {
        snake.x = canvas.width - 20;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    
    if (snake.y < 0) {
        snake.y = canvas.height - 20;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    
    snake.cells.unshift({x: snake.x, y: snake.y});
    
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, 20, 20);
    
    ctx.fillStyle = 'green';
    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, 20, 20);
        
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            document.getElementById('score').textContent = `Pontos: ${score} | Pontuação mais alta: ${highScore}`;
            apple.x = getRandomInt(0, 20) * 20;
            apple.y = getRandomInt(0, 20) * 20;
        }
        
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('highScore', highScore);
                }
                alert(`Game Over! Pontos: ${score} | Pontuação mais alta: ${highScore}`);
                resetGame();
            }
        }
    });
}

let count = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -20;
        snake.dy = 0;
    } else if (event.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -20;
        snake.dx = 0;
    } else if (event.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = 20;
        snake.dy = 0;
    } else if (event.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = 20;
        snake.dx = 0;
    }
});

resetGame();
gameLoop();
const eatSound = new Audio('steve-comendo.mp3');
const gameOverSound = new Audio('videogame-death-sound-43894.mp3');

if (cell.x === apple.x && cell.y === apple.y) {
    eatSound.play();
}

if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
    gameOverSound.play();
}
