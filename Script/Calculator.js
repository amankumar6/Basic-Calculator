/*
		Welcome to my Code
		I don't know where i'm going but I'm on my way :)
*/

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
	if (num == "") {
		document.getElementById("output-value").innerText = num;
	} else {
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}
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
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function () {
		if (this.id == "clear") {
			printHistory("");
			printOutput("");
		} else if (this.id == "backspace") {
			var output = reverseNumberFormat(getOutput()).toString();
			if (output) {
				output = output.substr(0, output.length - 1);
				printOutput(output);
			}
		} else {
			var output = getOutput();
			var history = getHistory();
			if (output == "" && history != "") {
				if (isNaN(history[history.length - 1])) {
					history = history.substr(0, history.length - 1);
				}
			}
			if (output != "" || history != "") {
				output = output == "" ? output : reverseNumberFormat(output);
				history = history + output;
				if (this.id == "=") {
					var result = eval(history);
					printOutput(result);
					printHistory("");
				} else {
					history = history + this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}

	});
}
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function () {
		var output = reverseNumberFormat(getOutput());
		if (output != NaN) {
			output = output + this.id;
			printOutput(output);
		}
	});
}

let input = document.querySelector(".custom-control-input")
let cal = document.querySelector(".main-calc");
let video = document.getElementById('video');
let source = document.createElement('source');
let ot = document.getElementById("output");
let empty = document.querySelectorAll(".empty");
let bool = false;

source.setAttribute('src', 'src/video/light.webm');
video.appendChild(source);
video.play();

input.addEventListener("change", () => {
	cal.classList.toggle("main-calc-dark");
	ot.classList.toggle("output-dark");
	for (let i = 0; i < empty.length; i++) {
		empty[i].classList.toggle("empty-dark")
	}
	for (let i = 0; i < number.length; i++) {
		number[i].classList.toggle("number-dark")
	}

	if (!bool) {
		video.pause();
		source.setAttribute('src', 'src/video/dark.mp4');
		video.load();
		video.play();
		bool = !bool;
	} else {
		video.pause();
		source.setAttribute('src', 'src/video/light.webm');
		video.load();
		video.play();
		bool = !bool;
	}
})

/*
It's not who I am underneath, but what I do that defines me

MMMMMMMMMMMMMMMMMMMMM.                             MMMMMMMMMMMMMMMMMMMMM
 `MMMMMMMMMMMMMMMMMMMM           M\  /M           MMMMMMMMMMMMMMMMMMMM'
   `MMMMMMMMMMMMMMMMMMM          MMMMMM          MMMMMMMMMMMMMMMMMMM'
     MMMMMMMMMMMMMMMMMMM-_______MMMMMMMM_______-MMMMMMMMMMMMMMMMMMM
      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
     .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
                   `MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'
                          `MMMMMMMMMMMMMMMMMM'
                              `MMMMMMMMMM'
                                 MMMMMM 
                                  MMMM
                                   MM
*/