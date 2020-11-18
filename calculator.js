const loader = document.getElementById("loading"),
	operator = document.querySelectorAll(".operator"),
	number = document.querySelectorAll(".number"),
	input = document.querySelector(".custom-control-input"),
	cal = document.querySelector(".main-calc"),
	video = document.getElementById('video'),
	ot = document.getElementById("output"),
	empty = document.querySelectorAll(".empty");

let before_loadtime = new Date().getTime(),
	bool = false;

window.addEventListener('load', () => {
	let after_loadtime = new Date().getTime();
	let page_loadtime = (after_loadtime - before_loadtime) / 1000;
	if (page_loadtime >= 1) {
		loader.style.display = 'none';
	} else {
		setTimeout(() => {
			loader.style.display = 'none';
		}, 0);
	}
});

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
	let n = Number(num);
	let value = n.toLocaleString("en");
	return value;
}

function reverseNumberFormat(num) {
	return Number(num.replace(/,/g, ''));
}

operator.forEach((element)=>{
	element.addEventListener('click', function () {
		if (this.id == "clear") {
			printHistory("");
			printOutput("");
		} else if (this.id == "backspace") {
			let output = reverseNumberFormat(getOutput()).toString();
			if (output) {
				output = output.substr(0, output.length - 1);
				printOutput(output);
			}
		} else {
			let output = getOutput();
			let history = getHistory();
			if (output == "" && history != "") {
				if (isNaN(history[history.length - 1])) {
					history = history.substr(0, history.length - 1);
				}
			}
			if (output != "" || history != "") {
				output = output == "" ? output : reverseNumberFormat(output);
				history = history + output;
				if (this.id == "=") {
					let result = eval(history);
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
})

number.forEach((element)=>{
	element.addEventListener('click', function () {
		let output = reverseNumberFormat(getOutput());
		if (output != NaN) {
			output = output + this.id;
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