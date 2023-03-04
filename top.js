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
    setInterval(function() {
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
