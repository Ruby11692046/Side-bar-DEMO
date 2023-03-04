window.addEventListener('load', function () {
    var roop = document.querySelector("#roop"); // roopというidのp要素を取得　見出しが流れるやつ
    var colors = ["orange", "darkorange"];
    var text = roop.innerHTML; // p要素の中身を取得
    var i = 0;
    var ii = 0;
    setInterval(function () {
        i++;
        roop.innerHTML = text.slice(i) + text.slice(0, i); // 文字列を左にずらす処理
        if (i >= text.length) i = 0; // 文字列が一周したらiを0に戻す
    }, 200);
    setInterval(function () {
        roop.style.color = colors[ii];
        ii = (ii + 1) % colors.length;
    }, 400);
});


window.addEventListener('load', function () {
    for (var i = 0; i < 100; i++) { //背景の星
        var star = document.createElement("div");
        star.classList.add("star");
        star.style.top = Math.floor(Math.random() * 100) + "%";
        star.style.left = Math.floor(Math.random() * 100) + "%";
        document.body.appendChild(star);
    }
});

function setTime() {
    const now = new Date();
    const hours = now.getHours() - 3.25;
    const minutes = now.getMinutes() - 15;
    const seconds = now.getSeconds() - 15;
    const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
    const minuteDegrees = (minutes / 60) * 360;
    const secondDegrees = (seconds / 60) * 360;
    document.querySelector("#hour-hand").style.transform = `rotate(${hourDegrees}deg)`;
    document.querySelector("#minute-hand").style.transform = `rotate(${minuteDegrees}deg)`;
    document.querySelector("#second-hand").style.transform = `rotate(${secondDegrees}deg)`;
    var nowtext = document.getElementById("now");
}
setInterval(setTime, 1000);

const dateElem = document.getElementById('date');
const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

dateElem.textContent = `${year}年${month}月${day}日`;

const shobonn = document.getElementById('shobonn');// キャラクターの要素
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
        const shobonnRect = shobonn.getBoundingClientRect();
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
    let currentLeft = parseInt(shobonn.style.left);
    let nextLeft = currentLeft + velocity.x;
    if (nextLeft < -600) {
        nextLeft = -600;
    } else if (nextLeft > 660) {
        nextLeft = 660;
    }
    shobonn.style.left = nextLeft + 'px';
    shobonn.style.top = parseInt(shobonn.style.top) + velocity.y + 'px';

    // ジャンプ中は重力を適用しない
    if (jumping) {
        velocity.y += gravity;
    }

    // 床についたらジャンプフラグを解除
    if (parseInt(shobonn.style.top) >= 200) {
        jumping = false;
        velocity.y = 0;
        shobonn.style.top = '200px';
    }
}

window.requestAnimationFrame(update);

// 初期座標を設定
shobonn.style.left = '600px';
shobonn.style.top = '200px';

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
shobonn.focus();
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

window.onload = function () {
    var texts = ["（　^ω^）", "（　 ^ω）", "（　　^）", "（　　 ）", "（^　　）", "（ω^　）", "（^ω^  ）", "（ ^ω^ ）"];
    // 1秒毎に切り替える文字列のリスト

    var turn = document.querySelector("#shobonn"); // turnクラスのp要素を取得

    var i = 0;
    setInterval(function () {
        turn.textContent = texts[i++ % texts.length]; // リストの中の文字列を1秒毎にループして設定
    }, 200);
};