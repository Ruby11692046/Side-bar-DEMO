const shobon = document.getElementById('shobon');// キャラクターの要素
const gameArea = document.getElementById('gameArea');//ゲームエリアの定義

//落下物の生成定義
function createFallingObject() {
    const newObject = document.createElement('div');
    newObject.classList.add('fallingObject');
    newObject.style.left = Math.floor(Math.random() * 1281) + 'px';
    gameArea.appendChild(newObject);
}

//ゲームオーバーを設定
let gameOver = false;

//落下物の落下処理
function checkCollision() {
    const fallingObjects = document.getElementsByClassName('fallingObject');
    for (let i = 0; i < fallingObjects.length; i++) {
        const object = fallingObjects[i];
        const objectRect = object.getBoundingClientRect();
        const shobonRect = shobon.getBoundingClientRect();
        if (
            objectRect.bottom >= shobonRect.top &&
            objectRect.top <= shobonRect.bottom &&
            objectRect.right >= shobonRect.left &&
            objectRect.left <= shobonRect.right
        ) {
            gameOver = true;
            const gameOverDiv = document.createElement("div");
            gameOverDiv.textContent = "Game Over";
            gameOverDiv.style.color = "white";
            gameOverDiv.style.position = "absolute";
            gameOverDiv.style.top = "50%";
            gameOverDiv.style.left = "50%";
            gameOverDiv.style.transform = "translate(-50%, -50%)";
            gameOverDiv.style.fontSize = "72px";
            gameOverDiv.style.fontWeight = "bold";
            gameOverDiv.style.fontFamily = "PressStart2P";
            document.body.appendChild(gameOverDiv);

            break;
        }
    }
}

function update() {
    //落下物の生成
    if (Math.random() < 0.25) {
        createFallingObject();
    }

    //落下物の落下処理
    const fallingObjects = document.getElementsByClassName('fallingObject');
    for (let i = 0; i < fallingObjects.length; i++) {
        const object = fallingObjects[i];
        const objectTop = parseInt(object.style.top) || 0;
        object.style.top = objectTop + 5 + 'px';
        if (objectTop > 600) {
            object.parentNode.removeChild(object);
        }
    }

    //ゲームオーバー時に全て停止
    if (!gameOver) {
        checkCollision();
        window.requestAnimationFrame(update);
    } else {
        clearInterval(counterI)
    }
    //～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
    //しょぼんのジャンプ
    //～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
    // キャラクターの座標を更新
    let currentLeft = parseInt(shobon.style.left);
    let nextLeft = currentLeft + velocity.x;
    if (nextLeft < 0) {
        nextLeft = 0;
    } else if (nextLeft > 1260) {
        nextLeft = 1260;
    }
    shobon.style.left = nextLeft + 'px';
    shobon.style.top = parseInt(shobon.style.top) + velocity.y + 'px';

    // ジャンプ中は重力を適用しない
    if (jumping) {
        velocity.y += gravity;
    }

    // 床についたらジャンプフラグを解除
    if (parseInt(shobon.style.top) >= 510) {
        jumping = false;
        velocity.y = 0;
        shobon.style.top = '510px';
    }
}

window.requestAnimationFrame(update);

// 初期座標を設定
shobon.style.left = '600px';
shobon.style.top = '510px';

//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
//しょぼんの動作
//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
let jumping = false; // ジャンプ中かどうかを示すフラグ
const jumpPower = 12; // ジャンプの強さ
const gravity = 0.5; // 重力の強さ
let velocity = { x: 0, y: 0 }; // キャラクターの速度

//ジャンプの定義
function jump() {
    if (!jumping) {
        jumping = true;
        velocity.y -= jumpPower;
    }
}

//キーを押した時の反応
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // Aキー
            velocity.x = -5;
            break;
        case 68: // Dキー
            velocity.x = 5;
            break;
        case 32: // スペースキー
            jump();
            break;
    }
});

//キーを押し終わった時の反応
document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // Aキー
        case 68: // Dキー
            velocity.x = 0;
            break;
    }
});

//最後にフォーカス
shobon.focus();
//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
//カウンター
//～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～

//カウンター
const counter = document.getElementById("counter");
let startTime = Date.now();
const counterI = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    counter.textContent = "SCORE:" + (elapsedTime / 100).toFixed(0);
}, 1);