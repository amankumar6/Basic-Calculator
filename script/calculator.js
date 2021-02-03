var loader = document.getElementById("loading"), operator = document.querySelectorAll(".operator"), number = document.querySelectorAll(".number"), input = document.querySelector(".custom-control-input"), cal = document.querySelector(".main-calc"), video = document.getElementById('video'), ot = document.getElementById("output"), empty = document.querySelectorAll(".empty");
var bool = false;
window.addEventListener('load', function () { return loader.style.display = 'none'; });
function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
function getOutput() {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    (num == "") ? document.getElementById("output-value").innerText = num : document.getElementById("output-value").innerText = getFormattedNumber(num);
}
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}
operator.forEach(function (element) {
    element.addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput();
            var history_1 = getHistory();
            if (output == "" && history_1 != "") {
                if (isNaN(history_1[history_1.length - 1])) {
                    history_1 = history_1.substr(0, history_1.length - 1);
                }
            }
            if (output != "" || history_1 != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history_1 += output;
                if (this.id == "=") {
                    var result = eval(history_1);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history_1 += this.id;
                    printHistory(history_1);
                    printOutput("");
                }
            }
        }
    });
});
number.forEach(function (element) {
    element.addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output += this.id;
            printOutput(output);
        }
    });
});
video.src = "https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202323/Basic-Calculator/light_b1jros.webm";
video.play();
input.addEventListener("change", function () {
    if (bool) {
        video.pause();
        video.src = "https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202323/Basic-Calculator/light_b1jros.webm";
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#eaedef');
        document.documentElement.style.setProperty('--text', 'black');
        document.documentElement.style.setProperty('--number', '#7d93e0');
    }
    else {
        video.pause();
        video.src = "https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202334/Basic-Calculator/dark_wcbgar.mp4";
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#1b2838');
        document.documentElement.style.setProperty('--text', 'whitesmoke');
        document.documentElement.style.setProperty('--number', '#333');
    }
    bool = !bool;
});
