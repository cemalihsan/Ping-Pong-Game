const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const stickWidth = 10;
const stickHeight = 100;

const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: canvas.height,
    color: "#FFF"
};

const bot1 = {
    x: 10,
    y: canvas.height / 2 - stickHeight / 2,
    width: stickWidth,
    height: stickHeight,
    color: '#FFF',
    score: 0
};

const bot = {
    x: canvas.width - (stickWidth + 10),
    y: canvas.height / 2 - stickHeight / 2,
    width: stickWidth,
    height: stickHeight,
    color: '#FFF',
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 15,
    height: 15,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: 'red'
};

function drawBoard() {
    context.fillStyle = "#000"; 
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawNet() {
    context.fillStyle = net.color;
    context.fillRect(net.x, net.y, net.width, net.height);
}

function drawScore(x, y, score) {
    context.fillStyle = '#fff';
    context.font = '35px sans-serif';
    context.fillText(score, x, y);
}

function drawStick(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawBall(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;

    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}

function collision(player, ball) {
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.width / 2;
    ball.right = ball.x + ball.height / 2;
    ball.bottom = ball.y + ball.width / 2;
    ball.left = ball.x - ball.height / 2;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}


function update() {

    let ballOnWhichPlayer;
    let angle = 0;

    if (ball.y + ball.width / 2 >= canvas.height || ball.y - ball.width / 2 <= 0) {
        ball.velocityY = -ball.velocityY;
    }

    if (ball.x + ball.height / 2 >= canvas.width) {
        bot1.score += 1;
        reset();
    }

    if (ball.x - ball.height / 2 <= 0) {
        bot.score += 1;
        reset();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    let x = ball.y - (bot.y + bot.height / 2);

    bot.y += (x) * 0.1;
    bot1.y += (x) * 0.1;

    if (ball.x < canvas.width / 2) {
        ballOnWhichPlayer = bot1;
    }
    else {
        ballOnWhichPlayer = bot;
    }

    if (collision(ballOnWhichPlayer, ball)) {

        if (ball.y < (ballOnWhichPlayer.y + ballOnWhichPlayer.height / 2)) {
            angle = -1 * Math.PI / 4;
        } else if (ball.y > (ballOnWhichPlayer.y + ballOnWhichPlayer.height / 2)) {
            angle = Math.PI / 4;
        }
        
        if(ballOnWhichPlayer==bot1){
            ball.velocityX = 1 * ball.speed * Math.cos(angle);
        }
        else{
            ball.velocityX = -1 * ball.speed * Math.cos(angle);
        }
        ball.velocityY = ball.speed * Math.sin(angle);

    }
}

function boardRender() {
 
    drawBoard();
    drawNet();
    drawScore(canvas.width / 4, canvas.height / 5, bot1.score);
    drawScore(3 * canvas.width / 4, canvas.height / 5, bot.score);
    drawStick(bot1.x, bot1.y, bot1.width, bot1.height, bot1.color);
    drawStick(bot.x, bot.y, bot.width, bot.height, bot.color);
    drawBall(ball.x, ball.y, ball.width, ball.height, ball.color);
}


function game() {
    if(bot1.score == 5 || bot.score == 5){
        alert("Game Over");
       document.location.reload();
       clearInterval(interval);
    }
    else{
        update();
    }
    boardRender();
}

var interval = setInterval(game, 1000 / 50);