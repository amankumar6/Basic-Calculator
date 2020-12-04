const loader: any = document.getElementById("loading"),
    operator: any = document.querySelectorAll(".operator"),
    number: any = document.querySelectorAll(".number"),
    input: any = document.querySelector(".custom-control-input"),
    cal: any = document.querySelector(".main-calc"),
    video: any = document.getElementById('video'),
    ot: any = document.getElementById("output"),
    empty: any = document.querySelectorAll(".empty");

let bool = false;

window.addEventListener('load', () => loader.style.display = 'none');

function getHistory() {
    return (document.getElementById("history-value") as HTMLInputElement).innerText;
}

function printHistory(num: any) {
    (document.getElementById("history-value") as HTMLInputElement).innerText = num;
}

function getOutput() {
    return (document.getElementById("output-value") as HTMLInputElement).innerText;
}

function printOutput(num: any) {
    (num == "") ? (document.getElementById("output-value") as HTMLInputElement).innerText = num : (document.getElementById("output-value") as HTMLInputElement).innerText = getFormattedNumber(num);
}

function getFormattedNumber(num: any) {
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num: any) {
    return Number(num.replace(/,/g, ''));
}

operator.forEach((element: any) => {
    element.addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id == "backspace") {
            let output: any = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            let output: any = getOutput();
            let history: any = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history += output;
                if (this.id == "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history += this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    });
})

number.forEach((element: any) => {
    element.addEventListener('click', function () {
        let output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output += this.id;
            printOutput(output);
        }
    });
})

video.src = "https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202323/Basic-Calculator/light_b1jros.webm";
video.play();

input.addEventListener("change", () => {
    if (bool) {
        video.pause();
        video.src = "https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202323/Basic-Calculator/light_b1jros.webm";
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#eaedef');
        document.documentElement.style.setProperty('--text', 'black');
        document.documentElement.style.setProperty('--number', '#7d93e0');
    } else {
        video.pause();
        video.src = "https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202334/Basic-Calculator/dark_wcbgar.mp4"
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#1b2838');
        document.documentElement.style.setProperty('--text', 'whitesmoke');
        document.documentElement.style.setProperty('--number', '#333');
    }
    bool = !bool;
})