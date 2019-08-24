//lấy id của canvas
var canvas = document.getElementById("background");
var ctx = canvas.getContext('2d');

//khởi tạo score, lives, tốc độ
var score = 0;
var score_x = 10;
var score_y = 20;
var lives = 3;
var lives_x = canvas.width - 70;
var lives_y = 20;

//khởi tạo của ball
var ball_x = canvas.width / 2;
var ball_y = canvas.height - 10;
var ball_radius = 10;
var dx = 2;
var dy = -2;

//khởi tạo paddle
var paddle_width = 80;
var paddle_height = 10;
var paddle_x = canvas.width / 2 - paddle_width / 2;
var paddle_y = canvas.height - paddle_height;
var dx_paddle = 5;
var rightPressed = false;
var leftPressed = false;

//khởi tạo mảng brick
var arr_brick_row = 3;
var arr_brick_column = 5;
var arr_brick = [];
var brick_width = 80;
var brick_height = 20;
var brick_top = 30;
var brick_left = 17;
var arr_brick_x = brick_left;
var arr_brick_y = brick_top;
var count_break = 0;

// khởi tạo mảng bricks
for (i = 0; i < arr_brick_row; i++) {
    arr_brick[i] = [];
    for (j = 0; j < arr_brick_column; j++) {
        arr_brick[i][j] = { x: 0, y: 0, status: 1, width: brick_width, height: brick_height };
    }
}

//vẽ ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ball_x += dx;
    ball_y += dy;

    //chỉnh lại quả bóng di chuyển khi chạm tường
    if (ball_x + ball_radius >= canvas.width) {
        dx = -dx;
    } else if (ball_y - ball_radius <= 0) {
        dy = -dy;
    } else if (ball_x - ball_radius <= 0) {
        dx = -dx;
    } else if (ball_y + ball_radius / 2 >= canvas.height) {
        if ((paddle_x < ball_x && paddle_x + paddle_width > ball_x)
            || (ball_x + ball_radius > paddle_x && ball_x <= paddle_x)
            || (ball_x - ball_radius < paddle_x + paddle_width && ball_x >= paddle_x + paddle_width)) {
            dy = -dy;
        } else {
            lives--;
            if (lives == 0) {
                alert("GAME OVER");
                document.location.reload(ball_x = canvas.width / 2, ball_y = canvas.height - 10);
            } else {
                ball_x = canvas.width / 2;
                ball_y = canvas.height - 10;
                dx = 2;
                dy = -2;
                paddle_x = canvas.width / 2 - paddle_width / 2;
                paddle_y = canvas.height - paddle_height;
            }
        }
    }
};

//vẽ paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle_x, paddle_y, paddle_width, paddle_height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    if (leftPressed && paddle_x - dx_paddle >= 0) {
        paddle_x -= dx_paddle;
    } else if (rightPressed && paddle_x + paddle_width + dx_paddle <= canvas.width) {
        paddle_x += dx_paddle;
    }
};

//vẽ score
function drawScore() {
    ctx.beginPath();
    ctx.font = '15pt Calibri';
    ctx.fillStyle = 'blue';
    ctx.fillText('Score: ' + score, score_x, score_y);
    ctx.fill();
    ctx.closePath();
};

//vẽ Lives
function drawLives() {
    ctx.beginPath();
    ctx.font = '15pt Calibri';
    ctx.fillStyle = 'blue';
    ctx.fillText('Lives: ' + lives, lives_x, lives_y);
    ctx.fill();
    ctx.closePath();
};


//vẽ mảng brick
function draw_arr_Brick() {
    for (i = 0; i < arr_brick_row; i++) {
        for (j = 0; j < arr_brick_column; j++) {
            if (arr_brick[i][j].status == 1) {
                ctx.beginPath();
                ctx.rect(arr_brick_x, arr_brick_y, arr_brick[i][j].width, arr_brick[i][j].height);
                ctx.fillStyle = "yellow";
                arr_brick[i][j].x = arr_brick_x;
                arr_brick[i][j].y = arr_brick_y;
                ctx.fill();
                ctx.closePath();
                arr_brick_x += brick_width + brick_left;
            } else {
                arr_brick_x += brick_width + brick_left;
            }
        }
        arr_brick_x = brick_left;
        arr_brick_y += brick_top + brick_height;
    }
    arr_brick_x = brick_left;
    arr_brick_y = brick_top;
    for (i = arr_brick_row - 1; i >= 0; i--) {
        for (j = arr_brick_column - 1; j >= 0; j--) {
            let brick = arr_brick[i][j];
            if (brick.status != 0) {
                if ((brick.y + brick.height >= ball_y - ball_radius && ball_y + ball_radius >= brick.y)
                    && ball_x + ball_radius < brick.x + brick.width && ball_x + ball_radius > brick.x) {
                    dy = -dy;
                    score++;
                    count_break++;
                    brick.status = 0;
                    if (count_break == arr_brick_row * arr_brick_column) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        alert("YOU WIN!");
                        document.location.reload(ball_x = canvas.width / 2, ball_y = canvas.height - 10);
                    }
                    break;
                }
            }
        }
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_arr_Brick();
    drawScore();
    drawLives();
    drawBall();
    drawPaddle();
};
setInterval(draw, 10);

//sự kiện ấn nút di chuyển
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 39) {
        rightPressed = true;
    }
}, false);

//sự kiện nhả nút
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 39) {
        rightPressed = false;
    }
}, false);