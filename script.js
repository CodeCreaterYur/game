let game = document.getElementById('game');
let speed = 1;
let score = 0;
let scoreElement = document.getElementById('score');
let timerElement = document.getElementById('timer');
let startTime;
let level = 1;
let touchStartX = 0;

function falling() {
    let fallingDiv = document.createElement('div');
    let colors = ['red', 'blue', 'orange', 'green'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    fallingDiv.classList.add('falling', randomColor);
    fallingDiv.style.width = '25px';
    fallingDiv.style.height = '25px';
    fallingDiv.style.position = 'absolute';
    fallingDiv.style.left = (Math.random() * (game.offsetWidth - 25)) + 'px';
    game.appendChild(fallingDiv);
}

function moveFallingDiv() {
    let fallingDivs = document.getElementsByClassName('falling');

    for (let i = 0; i < fallingDivs.length; i++) {
        let fallingDiv = fallingDivs[i];
        let top = fallingDiv.offsetTop;

        if (top < game.offsetHeight - 25) {
            fallingDiv.style.top = (top + speed) + 'px';
            checkCollision(fallingDiv);
        } else {
            game.removeChild(fallingDiv);
            falling();
        }
    }
}

function checkCollision(fallingDiv) {
    let fallingRect = fallingDiv.getBoundingClientRect();
    let boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        let boxRect = box.getBoundingClientRect();
        if (isCollide(fallingRect, boxRect)) {
            let fallingColor = fallingDiv.classList[1];
            let boxColor = box.classList[1];
            if (fallingColor == boxColor && !fallingDiv.alreadyCollided) {
                score += 1;
                scoreElement.textContent = 'միավոր: ' + score;
                fallingDiv.alreadyCollided = true;
                if (score == 5 && level == 1) {
                    alert("դու անցար երկրորդ փուլ 😀");
                    speed = 2;
                    level = 2;
                }
            } else if (fallingColor !== boxColor) {
                alert('🙁!');
                score = 0;
                speed = 1;
                scoreElement.textContent = 'միավոր: ' + score;
            }
            game.removeChild(fallingDiv);
            falling();
        }
    });
}

function isCollide(a, b) {
    return !(
        ((a.top + a.height) < b.top) ||
        (a.top > (b.top + b.height)) ||
        ((a.left + a.width) < b.left) ||
        (a.left > (b.left + b.width))
    );
}

function startTimer() {
    startTime = Date.now();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = 'ժամանակ: ' + currentTime + ' վրկ․';
}


document.addEventListener('keydown', function(event) {
    let fallingDivs = document.getElementsByClassName('falling');
    if (fallingDivs.length > 0) {
        let fallingDiv = fallingDivs[0];
        let left = fallingDiv.offsetLeft;
        if (event.key == 'ArrowLeft' && left > 0) {
            fallingDiv.style.left = (left - 5) + 'px';
        } else if (event.key == 'ArrowRight' && left < game.offsetWidth - 25) {
            fallingDiv.style.left = (left + 5) + 'px';
        }
    }
});

game.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
});

game.addEventListener('touchmove', function(event) {
    let fallingDivs = document.getElementsByClassName('falling');
    if (fallingDivs.length > 0) {
        let fallingDiv = fallingDivs[0];
        let left = fallingDiv.offsetLeft;
        let touchCurrentX = event.touches[0].clientX;

        if (touchCurrentX < touchStartX && left > 0) {
            fallingDiv.style.left = (left - 5) + 'px';
        } else if (touchCurrentX > touchStartX && left < game.offsetWidth - 25) {
            fallingDiv.style.left = (left + 5) + 'px';
        }

        touchStartX = touchCurrentX;
    }
});

game.focus();
startTimer();
falling();
setInterval(moveFallingDiv, 10);


        if (!localStorage.getItem('reloaded')) {
            localStorage.setItem('reloaded', 'true');
            window.location.href = 'file:///C:/Users/HP/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/menu/index.html';
        } else {

            localStorage.removeItem('reloaded');
        }