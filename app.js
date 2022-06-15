const start = document.querySelector('#start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('#time-list'),
    timeCount = document.querySelector("#time"),
    board = document.querySelector('.board'),
    colors = ['#2de2e6', '#035ee8', '#f6019d', '#d40078', '#9700cc'],
    restart = document.querySelector('.restart');

let time = 0;
let score = 0;

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function finishGame() {
    timeCount.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>
    <button class="time-btn restart" onClick="refreshPage()">Рестарт</button>`;
}

function refreshPage() {
    window.location.reload();
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.className = 'circle';
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    let color = getColor();
    circle.style.background = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    board.append(circle);
}

function getColor() {
    const color = Math.floor(Math.random() * colors.length);
    return colors[color];
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function decreaseTime() {
    if (time <= 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }
}

function setTime(value) {
    if (value === 60) {
        timeCount.innerHTML = `01:00`;
    } else {
        timeCount.innerHTML = `00:${value}`;
    }
}

function init() {
    start.addEventListener('click', (e) => {
        e.preventDefault();
        screens[0].classList.add('up');
    });
    timeList.addEventListener('click', (e) => {
        if (e.target.classList.contains('time-btn')) {
            time = parseInt(e.target.getAttribute('data-time'));
            screens[1].classList.add('up');
            startGame();
        }
    });
    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('circle')) {
            score++;
            e.target.remove();
            createRandomCircle();
        }
    })
}

init();