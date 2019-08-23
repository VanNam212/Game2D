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
var dx = 2;
var dy = -2;

//khởi tạo của ball
var ball_x = canvas.width / 2;
var ball_y = canvas.height - 10;
var ball_radius = 10;

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

// khởi tạo mảng bricks
for (i = 0; i < arr_brick_row; i++) {
    arr_brick[i] = [];
    for (j = 0; j < arr_brick_column; j++) {
        arr_brick[i][j] = { x: 0, y: 0, status: 1, width: brick_width, height: brick_height };
    }
}

// var ball = function () {
//     ball_radius = 10;
//     // getRadius = function () {
//     //     return this.ball_radius;
//     // };
//     drawBall = function () {
//         ctx.beginPath();
//         ctx.arc(ctx_width / 2, ctx_height - 10, 10, 0, 2 * Math.PI);
//         ctx.fillStyle = "red";
//         ctx.fill();
//         ctx.closePath();
//     }
// };

//vẽ ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ball_x += dx;
    ball_y += dy;

    //sự kiện khi ball chạm brick
    // for (i = 0; i < arr_brick_row; i++) {
    //     for (j = 0; j < arr_brick_column; j++) {
    //         if ((arr_brick[i][j].y + brick_height) >= ball_y && arr_brick[i][j].x < ball_x && arr_brick[i][j].x + brick_width > ball_x) {
    //             arr_brick[i][j].status = 0;
    //             arr_brick[i][j].x = 0;
    //             arr_brick[i][j].y = 0;
    //             arr_brick[i][j].width = 0;
    //             arr_brick[i][j].height = 0;
    //             dy = -dy;
    //         } else if (arr_brick[i][j].y >= ball_y && arr_brick[i][j].x <= ball_x && arr_brick[i][j].x + brick_width >= ball_x) {
    //             arr_brick[i][j].status = 0;
    //             dy = -dy;
    //             arr_brick[i][j].x = 0;
    //             arr_brick[i][j].y = 0;
    //             arr_brick[i][j].width = 0;
    //             arr_brick[i][j].height = 0;
    //         }
    //     }
    // }

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
            alert("GAME OVER");
            document.location.reload(ball_x = canvas.width / 2, ball_y = canvas.height - 10);
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
                ctx.rect(arr_brick_x, arr_brick_y, brick_width, brick_height);
                ctx.fillStyle = "yellow";
                arr_brick[i][j].x = arr_brick_x;
                arr_brick[i][j].y = arr_brick_y;
                ctx.fill();
                ctx.closePath();
                arr_brick_x += brick_width + brick_left;
            }
        }
        arr_brick_x = brick_left;
        arr_brick_y += brick_top + brick_height;
    }
    arr_brick_x = brick_left;
    arr_brick_y = brick_top;
    for (i = 0; i < arr_brick_row; i++) {
        for (j = 0; j < arr_brick_column; j++) {
            if ((arr_brick[i][j].y + brick_height) >= ball_y && arr_brick[i][j].x < ball_x
                && arr_brick[i][j].x + brick_width > ball_x) {
                arr_brick[i][j].status = 0;
                arr_brick[i][j].x = 0;
                arr_brick[i][j].y = 0;
                arr_brick[i][j].width = 0;
                arr_brick[i][j].height = 0;
                dy = -dy;
            } else if (arr_brick[i][j].y >= ball_y && arr_brick[i][j].x <= ball_x
                && arr_brick[i][j].x + brick_width >= ball_x) {
                arr_brick[i][j].status = 0;
                dy = -dy;
                arr_brick[i][j].x = 0;
                arr_brick[i][j].y = 0;
                arr_brick[i][j].width = 0;
                arr_brick[i][j].height = 0;
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