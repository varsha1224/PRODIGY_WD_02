let timer;
let lapTimer;
let hour = 0;
let minute = 0;
let second = 0;
let milisecond = 0;

$(document).ready(function () {
    $('#start').on('click', startStopwatch);
    $('#stop').on('click', stopStopwatch);
    $('#reset').on('click', resetStopwatch);
    $('#lap').on('click', recordLap);
});

function startStopwatch() {
    timer = setInterval(updateStopwatch, 10);
    lapTimer = setInterval(updateLapTime, 10);
    $('#start').prop('disabled', true);
}

function stopStopwatch() {
    clearInterval(timer);
    clearInterval(lapTimer);
    $('#start').prop('disabled', false);
}

function resetStopwatch() {
    clearInterval(timer);
    clearInterval(lapTimer);
    $('#start').prop('disabled', false);
    hour = 0;
    minute = 0;
    second = 0;
    milisecond = 0;
    updateDisplay();
    resetLapDisplay();
}

function recordLap() {
    const lapTime = formatTime(hour) + ':' + formatTime(minute) + ':' + formatTime(second) + '.' + formatTime(milisecond / 10);
    const lapItem = $('<li>').text('Lap ' + ($('#laps li').length + 1) + ': ' + lapTime);
    $('#laps').append(lapItem);
    
    // Show lapTime container
    $('.lapTime').show();
    
    resetLapTimer();
}


function updateLapTime() {
    const lapTime = formatTime(hour) + ':' + formatTime(minute) + ':' + formatTime(second) + '.' + formatTime(milisecond / 10);
    $('#lapTime').text('Lap Time: ' + lapTime);
}

function resetLapTimer() {
    clearInterval(lapTimer);
    lapTimer = setInterval(updateLapTime, 10);
}

function resetLapDisplay() {
    $('#laps').empty();
    $('#lapTime').text('Lap Time: 00:00:00.0');
}

function updateStopwatch() {
    milisecond += 10;

    if (milisecond === 1000) {
        milisecond = 0;
        second++;

        if (second === 60) {
            second = 0;
            minute++;

            if (minute === 60) {
                minute = 0;
                hour++;
            }
        }
    }

    updateDisplay();
}

function updateDisplay() {
    $('#hr').text(formatTime(hour));
    $('#min').text(formatTime(minute));
    $('#sec').text(formatTime(second));
    $('#mil').text(formatTime(milisecond / 10));
}

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}
