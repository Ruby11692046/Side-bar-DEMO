function setTime() {
    const now = new Date();
    const hours = now.getHours() - 3;
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