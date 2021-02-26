var _this = this;
var loader = document.querySelector('#loading'), input = document.querySelector('.custom-control-input'), cal = document.querySelector('.main-calc'), video = document.querySelector('#video'), ot = document.querySelector('#output'), operator = document.querySelectorAll('.operator'), number = document.querySelectorAll('.number'), empty = document.querySelectorAll('.empty');
var bool = false;
window.addEventListener('load', function () { return (loader.style.display = 'none'); });
function getHistory() {
    return document.getElementById('history-value')
        .innerText;
}
function printHistory(num) {
    document.getElementById('history-value').innerText = num;
}
function getOutput() {
    return document.getElementById('output-value')
        .innerText;
}
function printOutput(num) {
    num == ''
        ? (document.getElementById('output-value').innerText = num)
        : (document.getElementById('output-value').innerText = getFormattedNumber(num));
}
function getFormattedNumber(num) {
    if (num == '-')
        return '';
    var n = Number(num), value = n.toLocaleString('en');
    return value;
}
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}
operator.forEach(function (element) {
    element.addEventListener('click', function () {
        if (_this.id == 'clear') {
            printHistory('');
            printOutput('');
        }
        else if (_this.id == 'backspace') {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput(), history_1 = getHistory();
            if (output == '' && history_1 != '')
                if (isNaN(history_1[history_1.length - 1]))
                    history_1 = history_1.substr(0, history_1.length - 1);
            if (output != '' || history_1 != '') {
                output = output == '' ? output : reverseNumberFormat(output);
                history_1 += output;
                if (_this.id == '=') {
                    var result = eval(history_1);
                    printOutput(result);
                    printHistory('');
                }
                else {
                    history_1 += _this.id;
                    printHistory(history_1);
                    printOutput('');
                }
            }
        }
    });
});
number.forEach(function (element) {
    element.addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output += _this.id;
            printOutput(output);
        }
    });
});
video.src =
    'https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202323/Basic-Calculator/light.webm';
video.play();
input.addEventListener('change', function () {
    if (bool) {
        video.pause();
        video.src =
            'https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202334/Basic-Calculator/light.webm';
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#eaedef');
        document.documentElement.style.setProperty('--text', 'black');
        document.documentElement.style.setProperty('--number', '#7d93e0');
    }
    else {
        video.pause();
        video.src =
            'https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202334/Basic-Calculator/dark.mp4';
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#1b2838');
        document.documentElement.style.setProperty('--text', 'whitesmoke');
        document.documentElement.style.setProperty('--number', '#333');
    }
    bool = !bool;
});
