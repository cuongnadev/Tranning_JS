export class Input {
    /**
     *
     * @param {HTMLInputElement} options
     * @param {...string} className
     */
    constructor(options = {}, ...className) {
        this.input = document.createElement('input');
        this.input.className = 'input';
        this.input.classList.add(...className);

        Object.keys(options).forEach((value) => {
            this.input[value] = options[value];
        });
    }
    render() {
        return this.input;
    }
}
