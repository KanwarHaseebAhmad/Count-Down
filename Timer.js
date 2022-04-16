export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.elem = {
            minutes: root.querySelector('.minutes'),
            seconds: root.querySelector('.seconds'),
            control: root.querySelector('.start'),
            reset: root.querySelector('.reset'),
        };
        this.interval = null;
        this.remainingSeconds = 0;
        this.updateInterfaceControl();
        this.elem.control.addEventListener('click', () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });
        this.elem.reset.addEventListener('click', () => {
            const inputMinutes = prompt("Enter Time Between 0 and 60 minutes");

            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }
    updateInterfaceControl() {
        if (this.interval === null) {
            this.elem.control.innerHTML = `<span class="material-icons">
            play_arrow
        </span>`;
            this.elem.control.classList.add('start');
            this.elem.control.classList.remove('stop');
        } else {
            this.elem.control.innerHTML = `<span class="material-icons">
            pause
        </span>`;
            this.elem.control.classList.add('stop');
            this.elem.control.classList.remove('start');
        }
    }
    start() {
        if (this.remainingSeconds === 0) return;
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);
        this.updateInterfaceControl();
    }
    stop() {
        clearInterval(this.interval);

        this.interval = null;
        this.updateInterfaceControl();
    }
    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.elem.minutes.textContent = minutes.toString().padStart(2, '0');
        this.elem.seconds.textContent = seconds.toString().padStart(2, '0');
    }
    static getHTML() {
        return `
        <span class="minutes part">00</span>
        <span class="colon part">:</span>
        <span class="seconds part">00</span>
        <button type="button" class="btn start">
            <span class="material-icons">
                play_arrow
            </span>
        </button>
        <button type="button" class="btn reset">
            <span class="material-icons">
                timer
            </span>
        </button>`;
    }
}
