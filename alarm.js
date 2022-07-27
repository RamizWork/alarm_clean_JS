const clockNow = document.querySelector('.clock__now');
const alarmAddButton = document.querySelector('.add__alarm_button');
let alarmInput = document.querySelector('.add__alarm_input');
let divAlarmAnimation;
let tagSound;
let date;
let hours;
let minutes;
let seconds;
let onAlarm;

function actualTime() {
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    if(seconds < 10) {
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
        setTimeout(() => {tagSound.remove(); divAlarmAnimation.remove()}, 10000);
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

// alarmInput.addEventListener('keydown', (event) => {
//     const value = event.target.value;
//     event.target.value = value.replace(/\D/g,"");
// });

function change(event){
    const value = event.value;
    event.value = value.replace(/\D/g,"");
}


setInterval(() => {
    actualTime()
    if (onAlarm === `${hours}${minutes}${seconds}`){
        timeAlarm()
    }
}, 1000);

