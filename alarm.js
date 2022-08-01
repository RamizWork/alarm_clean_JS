const clockNow = document.querySelector('.clock__now');
const alarmAddButton = document.querySelector('.add__alarm_button');
const alarmInput = document.querySelector('#alarmsInput');
const addAlarm = document.querySelector('.add__alarm');
const alarm1Div = document.createElement('div');
const alarmErrorHour = document.createElement('div');
const alarmErrorMinutes = document.createElement('div');
const wrapperDiv = document.createElement('div');
const removeAddButton = document.createElement('button');
const divAlarmAnimation = document.createElement('div');
const tagSound = document.createElement('div');
let date;
let hours;
let minutes;
let seconds;
let onAlarm;
let isPressBackspace = false;
let arrayInputData = [];
let alarm1;
let addButton = false;
let access = false;

wrapperDiv.className = 'wrapper__alarm_button';
divAlarmAnimation.className = 'animation__alarm_add';
alarm1Div.className = 'alarm__div';
removeAddButton.className = 'remove__alarm_button';
alarmErrorHour.className = 'alarm__error_hour';
alarmErrorMinutes.className = 'alarm__error_minutes';

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
    document.body.append(divAlarmAnimation);
    document.body.append(tagSound);
    tagSound.innerHTML = `<audio autoplay loop src="assets/1.mp3" class="add__alarm_sound">`;
    setTimeout(() => {
        tagSound.remove();
        divAlarmAnimation.remove()
    }, 15000);
}

alarmAddButton.onclick = function () {
    if (alarmInput.value.length !== 5) {
        addAlarm.after(alarm1Div);
        alarm1Div.innerHTML = 'The field to input empty';
        setTimeout(() => {
            alarm1Div.remove();
        }, 5000);
    } else {
        addButton = true;
        access = true;
        alarm1Div.innerHTML = 'Alarm will work in ' + alarm1.slice(0, 2) + 'hours' + alarm1.slice(3, 5) + 'min.';
        addAlarm.after(alarm1Div);
        onAlarm = alarm1.slice(0, 2) + alarm1.slice(3, 5) + '00';
    }
    if (addButton && access) {
        removeAddButton.innerHTML = 'Remove alarm';
        alarm1Div.prepend(removeAddButton);
    }
    alarmInput.value = '';
}

removeAddButton.onclick = () => {
    onAlarm = '';
    tagSound.remove();
    divAlarmAnimation.remove()
    alarm1Div.remove();
    removeAddButton.remove();
    access = false;
}

const onKeyPress = function (event) {
    isPressBackspace = event.keyCode === 8;

    if (event.keyCode < 58 && event.keyCode > 46 || isPressBackspace || event.keyCode >= 96 && event.keyCode <= 106) {
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
        alarmErrorHour.innerHTML = alarm1;
        addAlarm.after(alarmErrorHour);
        alarmErrorHour.innerHTML = 'The hours field cannot be more than 24 hours';
        setTimeout(() => {
            alarmErrorHour.remove();
        }, 3000);
        value = value[0];
    } else {
        alarmErrorHour.remove();
    }

    if (value.length === 5 && value[3] + value[4] >= 60) {
        alarmErrorMinutes.innerHTML = alarm1;
        addAlarm.after(alarmErrorMinutes);
        alarmErrorMinutes.innerHTML = 'The minutes field cannot be more then 59 minutes';
        setTimeout(() => {
            alarmErrorMinutes.remove();
        }, 3000);
        value = value.slice(0, 4);
        event.target.value = value;
    } else {
        alarmErrorMinutes.remove();
    }

    if (value.length === 5) {
        alarm1 = event.target.value;
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
        setTimeout(() => {
            alarm1Div.remove();
        }, 15000)
    }
}, 1000);

