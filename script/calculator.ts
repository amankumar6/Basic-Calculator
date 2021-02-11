const loader: HTMLElement | null = document.querySelector('#loading'),
    input: HTMLElement | null = document.querySelector('.custom-control-input'),
    cal: HTMLElement | null = document.querySelector('.main-calc'),
    video: HTMLVideoElement | null = document.querySelector('#video'),
    ot: HTMLElement | null = document.querySelector('#output'),
    operator: NodeListOf<HTMLElement> | null = document.querySelectorAll(
        '.operator'
    ),
    number: NodeListOf<HTMLElement> | null = document.querySelectorAll(
        '.number'
    ),
    empty: NodeListOf<HTMLElement> | null = document.querySelectorAll('.empty');

let bool: boolean = false;

window.addEventListener('load', () => (loader.style.display = 'none'));

function getHistory() {
    return (document.getElementById('history-value') as HTMLInputElement)
        .innerText;
}

function printHistory(num: string) {
    (document.getElementById(
        'history-value'
    ) as HTMLInputElement).innerText = num;
}

function getOutput() {
    return (document.getElementById('output-value') as HTMLInputElement)
        .innerText;
}

function printOutput(num: string) {
    num == ''
        ? ((document.getElementById(
              'output-value'
          ) as HTMLInputElement).innerText = num)
        : ((document.getElementById(
              'output-value'
          ) as HTMLInputElement).innerText = getFormattedNumber(num));
}

function getFormattedNumber(num: string) {
    if (num == '-') return '';
    let n = Number(num),
        value = n.toLocaleString('en');
    return value;
}

function reverseNumberFormat(num: string) {
    return Number(num.replace(/,/g, ''));
}

operator.forEach((element: HTMLElement | null) => {
    element.addEventListener('click', () => {
        if (this.id == 'clear') {
            printHistory('');
            printOutput('');
        } else if (this.id == 'backspace') {
            let output: string = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            let output: any = getOutput(),
                history: any = getHistory();
            if (output == '' && history != '')
                if (isNaN(history[history.length - 1]))
                    history = history.substr(0, history.length - 1);

            if (output != '' || history != '') {
                output = output == '' ? output : reverseNumberFormat(output);
                history += output;
                if (this.id == '=') {
                    let result = eval(history);
                    printOutput(result);
                    printHistory('');
                } else {
                    history += this.id;
                    printHistory(history);
                    printOutput('');
                }
            }
        }
    });
});

number.forEach((element: any) => {
    element.addEventListener('click', () => {
        let output: any = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output += this.id;
            printOutput(output);
        }
    });
});

video.src =
    'https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202323/Basic-Calculator/light.webm';
video.play();

input.addEventListener('change', () => {
    if (bool) {
        video.pause();
        video.src =
            'https://res.cloudinary.com/dbvthtwhc/video/upload/v1605202334/Basic-Calculator/dark.mp4';
        video.load();
        video.play();
        document.documentElement.style.setProperty('--bgColor', '#eaedef');
        document.documentElement.style.setProperty('--text', 'black');
        document.documentElement.style.setProperty('--number', '#7d93e0');
    } else {
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
