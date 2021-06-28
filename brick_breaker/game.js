// SELECT CANVAS ELEMENT

let hbt = document.getElementById("hbt")

function hide() {
    var front = document.querySelector('.front')
    console.log("I ran")
    front.style.opacity = "0"
    front.style.display = "none"

    const cvs = document.getElementById("breakout");
    const ctx = cvs.getContext("2d");

    // ADD BORDER TO CANVAS
    // cvs.style.border = "1px solid #0ff";

    // MAKE LINE THIK WHEN DRAWING TO CANVAS
    ctx.lineWidth = 3;

    // GAME VARIABLES AND CONSTANTS
    let LEVEL = 1;
    let pw = [400, 400, 200, 200]
    let PADDLE_WIDTH = pw[LEVEL];
    const PADDLE_MARGIN_BOTTOM = 50;
    const PADDLE_HEIGHT = 20;
    let bl = [50, 50, 40, 30]
    let BALL_RADIUS = bl[LEVEL]
    let LIFE = 10;
    let SCORE = 0;
    const SCORE_UNIT = 10;
    const MAX_LEVEL = 3;
    let GAME_OVER = false;
    let leftArrow = false;
    let rightArrow = false;
    let defaultColor = "#E21717"

    // CREATE THE PADDLE
    var paddle = {
        x: cvs.width / 2 - PADDLE_WIDTH / 2,
        y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
        width: pw[LEVEL] - 100,
        height: PADDLE_HEIGHT,
        dx: LEVEL * 20
    }


    let randbrickcolor = ["#0048BA", "#E52B50", "#9F2B68", "#D3212D", "#FF7E00", "#841B2D", "#F19CBB", "#3B7A57", "#841B2D", "#A52A2A", "#2E5894", "#9C2542", "#3D2B1F", "#FE6F5E", "#BF4F51", "#0093AF",
        "#0018A8", "#064E40", "#4D1A7F", "#006A4E", "#CB4154"
    ]



    // DRAW PADDLE
    function drawPaddle() {

        random = Math.floor(Math.random() * randbrickcolor.length);

        ctx.fillStyle = randbrickcolor[LEVEL];
        // console.log(padd)
        ctx.fillRect(paddle.x, paddle.y, pw[LEVEL], paddle.height);

        ctx.strokeStyle = randbrickcolor[LEVEL];
        ctx.strokeRect(paddle.x, paddle.y, pw[LEVEL], paddle.height);
    }

    // CONTROL THE PADDLE
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 37) {
            leftArrow = true;
        } else if (event.keyCode == 39) {
            rightArrow = true;
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 37) {
            leftArrow = false;
        } else if (event.keyCode == 39) {
            rightArrow = false;
        }
    });

    // MOVE PADDLE
    function movePaddle() {
        if (rightArrow && paddle.x + pw[LEVEL] < cvs.width) {
            paddle.x += paddle.dx;
        } else if (leftArrow && paddle.x > 0) {
            paddle.x -= paddle.dx;
        }
    }

    // CREATE THE BALL

    let ballObject = {
        x: cvs.width / 2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 7,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3
    }


    let ball1 = {
        x: cvs.width / 2 - 1,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 7,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3

    }
    let ball2 = {
        x: cvs.width / 2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 7,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3
    }

    let ball3 = {
        x: cvs.width / 2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 7,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3
    }

    let ball4 = {
        x: cvs.width / 2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 7,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3
    }

    let ball5 = {
        x: cvs.width / 2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 7,
        dx: 3 * (Math.random() * 2 - 1),
        dy: -3
    }

    let ball;

    let ballArr = [ball1, ball2, ball3, ball4, ball5];

    // DRAW THE BALL
    function drawBall() {

        ctx.beginPath();
        // console.log(ball.radius)

        ctx.arc(ball.x, ball.y, bl[LEVEL], 0, Math.PI * 2);

        ctx.fillStyle = defaultColor
        ctx.fill();

        // ctx.strokeStyle = "#242B2E";
        // ctx.stroke();

        ctx.closePath();
    }

    // MOVE THE BALL
    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    // BALL AND WALL COLLISION DETECTION
    function ballWallCollision() {
        console.log('called');
        if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
            WALL_HIT.play();
        }

        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
            WALL_HIT.play();
        }

        if (ball.y + ball.radius > cvs.height) {
            LIFE--; // LOSE LIFE
            LIFE_LOST.play();
            resetBall();
        }
    }

    // RESET THE BALL
    function resetBall() {
        ball.x = cvs.width / 2;
        ball.y = paddle.y - BALL_RADIUS;
        ball.dx = 3 * (Math.random() * 2 - 1);
        ball.dy = -3;
        // BALL_RADIUS+=20
    }

    // BALL AND PADDLE COLLISION
    function ballPaddleCollision() {
        console.log(ball.x, ball.y);
        if (ball.x <= paddle.x + pw[LEVEL] &&
            ball.x >= paddle.x &&
            ball.y + ball.radius >= paddle.y) {

            // PLAY SOUND
            PADDLE_HIT.play();

            // CHECK WHERE THE BALL HIT THE PADDLE
            let collidePoint = ball.x - (paddle.x + pw[LEVEL] / 2);

            // NORMALIZE THE VALUES
            collidePoint = collidePoint / (pw[LEVEL] / 2);

            // CALCULATE THE ANGLE OF THE BALL
            let angle = collidePoint * Math.PI / 3;


            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = -ball.speed * Math.cos(angle);
        }
    }

    // CREATE THE BRICKS
    const brick = {
        row: 1,
        column: 2,
        width: 500,
        height: 20,
        offSetLeft: 10,
        offSetTop: 10,
        marginTop: 40,
        fillColor: "#2e1548",
        strokeColor: "#FFF"
    }

    let bricks = [];

    function createBricks() {
        for (let r = 0; r < brick.row; r++) {
            bricks[r] = [];
            for (let c = 0; c < brick.column; c++) {
                bricks[r][c] = {
                    x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                    y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                    status: true,
                    bcolor: randbrickcolor[r]

                }
                // console.log(bricks[r][c].bcolor)
            }
        }
    }

    createBricks();

    // draw the bricks
    function drawBricks() {
        for (let r = 0; r < brick.row; r++) {


            for (let c = 0; c < brick.column; c++) {
                let b = bricks[r][c];
                // if the brick isn't broken
                if (b.status) {
                    // console.log(b.color)
                    ctx.fillStyle = b.bcolor;
                    ctx.fillRect(b.x, b.y, brick.width, brick.height);

                    ctx.strokeStyle = brick.strokeColor;
                    ctx.strokeRect(b.x, b.y, brick.width, brick.height);
                }
            }
        }
    }

    // ball brick collision
    function ballBrickCollision() {
        for (let r = 0; r < brick.row; r++) {
            for (let c = 0; c < brick.column; c++) {
                let b = bricks[r][c];
                // if(b.bcolor)
                // console.log(b.bcolor)
                // if the brick isn't broken
                if (b.status) {
                    if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                        BRICK_HIT.play();
                        // ctx.fillColor = bricks[r][c].bcolor
                        ctx.arc(ball.x, ball.y, bl[LEVEL], 0, Math.PI * 2);
                        defaultColor = bricks[r][c].bcolor;
                        ctx.fill();
                        // console.log(ball.color)
                        // console.log(bricks[r][c])
                        ball.dy = -ball.dy;
                        b.status = false; // the brick is broken
                        SCORE += SCORE_UNIT;
                        scoreup(SCORE)
                        shakeScreen(5);
                    }
                }
            }
        }
    }

    // show game stats
    function showGameStats(text, textX, textY, img, imgX, imgY) {
        // draw text
        ctx.fillStyle = "#FFF";
        ctx.font = "25px Germania One";
        ctx.fillText(text, textX, textY);

        // draw image
        ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
    }

    // DRAW FUNCTION
    function draw() {
        drawPaddle();

        for (let i = 0; i < LEVEL; ++i) {
            ball = ballArr[i];
            drawBall();
        }

        drawBricks();

        // SHOW SCORE
        showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
        // SHOW LIVES
        showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width - 55, 5);
        // SHOW LEVEL
        showGameStats(LEVEL, cvs.width / 2, 25, LEVEL_IMG, cvs.width / 2 - 30, 5);

    }

    // game over
    function gameOver() {
        if (LIFE <= 0) {
            showYouLose();
            GAME_OVER = true;
        }
    }

    // level up
    function levelUp() {
        let isLevelDone = true;

        // check if all the bricks are broken
        for (let r = 0; r < brick.row; r++) {
            for (let c = 0; c < brick.column; c++) {
                isLevelDone = isLevelDone && !bricks[r][c].status;
            }
        }

        if (isLevelDone) {
            WIN.play();

            if (LEVEL >= MAX_LEVEL) {
                showYouWin();
                GAME_OVER = true;
                return;
            }
            brick.row++;
            brick.column += 2;
            brick.width /= 2

            var letters = "0123456789ABCDEF";

            // html color code starts with #
            var color = '#';

            // generating 6 times as HTML color code consist
            // of 6 letter or digits
            for (var i = 0; i < 6; i++)
                color += letters[(Math.floor(Math.random() * 16))];
            brick.fillColor = color

            for (var i = 0; i < 6; i++)
                color += letters[(Math.floor(Math.random() * 16))];
            createBricks();
            ball.speed += 0.5;

            LEVEL++;
            for (let i = 0; i < LEVEL; ++i) {
                ball = ballArr[i];
                resetBall();
            }
            console.log(bl[LEVEL])
        }
    }

    // UPDATE GAME FUNCTION
    function update() {
        movePaddle();

        for (let i = 0; i < LEVEL; ++i) {
            ball = ballArr[i];
            moveBall();

            ballWallCollision();

            ballPaddleCollision();

            ballBrickCollision();
        }

        gameOver();
        levelUp();
    }

    // GAME LOOP
    function loop() {
        // CLEAR THE CANVAS
        ctx.drawImage(BG_IMG, 0, 0);

        draw();

        update();

        if (!GAME_OVER) {
            requestAnimationFrame(loop);
        }
    }
    loop();


    // SELECT SOUND ELEMENT
    const soundElement = document.getElementById("sound");

    soundElement.addEventListener("click", audioManager);

    function audioManager() {
        // CHANGE IMAGE SOUND_ON/OFF
        let imgSrc = soundElement.getAttribute("src");
        let SOUND_IMG = imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";

        soundElement.setAttribute("src", SOUND_IMG);

        // MUTE AND UNMUTE SOUNDS
        WALL_HIT.muted = WALL_HIT.muted ? false : true;
        PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
        BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
        WIN.muted = WIN.muted ? false : true;
        LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
    }

    // SHOW GAME OVER MESSAGE
    /* SELECT ELEMENTS */
    const gameover = document.getElementById("gameover");
    const youwin = document.getElementById("youwin");
    const youlose = document.getElementById("youlose");
    const restart = document.getElementById("restart");

    // CLICK ON PLAY AGAIN BUTTON
    restart.addEventListener("click", function () {
        location.reload(); // reload the page
    })

    // SHOW YOU WIN
    function showYouWin() {
        gameover.style.display = "block";
        youwon.style.display = "block";

        notify("Congratulations You Won")
        setTimeout(() => {
            console.log("show winner")

            location.reload()
        }, 3000)
    }

    // SHOW YOU LOSE
    function showYouLose() {
        // gameover.style.display = "block";
        // youlose.style.display = "block";
        notify("Game Over .Restarting the game")
        setTimeout(() => {

            location.reload()
        }, 3000)
        // console.log("after game over ran")

    }

    function notify(a) {
        Toastify({
            text: a,
            duration: 3000,
            // destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () {

            } // Callback after click
        }).showToast();
    }

    function scoreup(a) {
        Toastify({
            text: `+10`,
            duration: 1000,
            // destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () {

            } // Callback after click
        }).showToast();
    }


    function preShake(strength) {
        ctx.save();
        var dx = Math.random() * strength;
        var dy = Math.random() * strength;
        ctx.translate(dx, dy);
    }

    function postShake() {
        ctx.restore();
    }

    function shakeScreen(strength) {
        preShake(strength);
        draw();
        postShake();
    }
}