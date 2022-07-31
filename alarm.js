const clockNow = document.querySelector('.clock__now');
const alarmAddButton = document.querySelector('.add__alarm_button');
const alarmInput = document.querySelector('#alarmsInput');

let divAlarmAnimation;
let tagSound;
let date;
let hours;
let minutes;
let seconds;
let onAlarm;
let isPressBackspace = false;
let arrayInputData = [];
let numOne;
let numTwo;

function actualTime() {
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    clockNow.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function timeAlarm() {
    tagSound = document.createElement('div');
    divAlarmAnimation = document.createElement('div');
    divAlarmAnimation.className = 'animation__alarm_add';
    document.body.append(divAlarmAnimation);
    document.body.append(tagSound);
    tagSound.innerHTML = `<audio autoplay loop src="assets/1.mp3" class="add__alarm_sound">`;
    setTimeout(() => {
        tagSound.remove();
        divAlarmAnimation.remove()
    }, 10000);
}

alarmAddButton.onclick = function () {
    if (alarmInput.value.length < 6 || isNaN(alarmInput.value)) {
        alert('Введите значение вида час:мин:сек');
        alarmInput.value = '';
    } else if (alarmInput.value.length > 5) {
        onAlarm = alarmInput.value;
        alarmInput.value = '';
    }
}

const onKeyPress = function (event) {
    isPressBackspace = event.keyCode === 8;

    if (event.keyCode < 58 && event.keyCode > 46 || isPressBackspace) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }

}

const onInput = function (event) {
    let isRun = true;
    let value = event.target.value;

    if (value.length === 2 && value[0] + value[1] >= 24) {
        alert('Не иожет быть больше 24');
        value = value[0];
    }

    if (value.length === 5 && value[3] + value[4] >= 60) {
        alert('Не иожет быть 60');
        value = value.slice(0, 4);
        event.target.value = value;
    }

    if (arrayInputData.length) {
        for (let i = 2; i < arrayInputData.length; i++) {
            if (arrayInputData[i] === value[i]) {
                isRun = false;
                break;
            }
        }
    }

    if (isRun) {
        arrayInputData.length = 0;

        for (let i = 0; i < value.length; i++) {
            arrayInputData.push(value[i]);

            if (arrayInputData.length === 2 && !isPressBackspace) {
                arrayInputData.push(':');
            }
        }
        event.target.value = arrayInputData.join('');
        event.preventDefault();
    }
}

alarmInput.addEventListener('input', onInput);
alarmInput.addEventListener('keydown', onKeyPress);

setInterval(() => {
    actualTime();
    if (onAlarm === `${hours}${minutes}${seconds}`) {
        timeAlarm();
    }
}, 1000);

