function changeSrc() {
    var iframe = document.getElementById("my-iframe");
    iframe.src = "top.html";
}

function changeSrc2() {
    var iframe = document.getElementById("my-iframe");
    iframe.src = "play.html";
}

function changeSrc3() {
    var iframe = document.getElementById("my-iframe");
    iframe.src = "about.html";
}

function changeSrc4() {
    var iframe = document.getElementById("my-iframe");
    iframe.src = "clock.html";
}

function changeSrc5() {
    var iframe = document.getElementById("my-iframe");
    iframe.src = "all.html";
}

function rocket() {
    var rocket = document.getElementById("rocket");
    rocket.style.position = 'relative';
    let position = 0;
    const flyUp = setInterval(frame, 3);
    function frame() {
        if (position === -500) {
            clearInterval(flyUp);
            rocket.remove();
        } else {
            position--;
            rocket.style.top = position + 'px';
        }
    }
}

window.onload = function () {
    var texts = ["（　^ω^）", "（　 ^ω）", "（　　^）", "（　　 ）", "（^　　）", "（ω^　）", "（^ω^  ）", "（ ^ω^ ）"];
    // 1秒毎に切り替える文字列のリスト

    var turn = document.querySelector("#rocket"); // turnクラスのp要素を取得

    var i = 0;
    setInterval(function () {
        turn.textContent = texts[i++ % texts.length]; // リストの中の文字列を1秒毎にループして設定
    }, 200);
};

function updateClock() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    hour = ('0' + hour).slice(-2);
    minute = ('0' + minute).slice(-2);
    let time = hour + ':' + minute;
    document.getElementById('clockmenu').textContent = time;
    setTimeout(updateClock, 1000);
}
updateClock();