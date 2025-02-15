export class TextArea {
    /**
     * @constructor
     * @param {HTMLTextAreaElement} options - Options for configuring the text area.
     * @param {...string} className - Additional class names to be applied to the text area.
     */
    constructor(options = {}, ...className) {
        // leading class name: input

        this.textArea = document.createElement('textarea');
        this.textArea.className = 'input input-textarea';
        this.textArea.classList.add(...className);

        Object.keys(options).forEach((value) => {
            this.textArea[value] = options[value];
        });

        // if rows is not provided, make text area full of container width
        if (!options.rows) {
            this.textArea.classList.add('h-full');
        }
    }

    render() {
        return this.textArea;
    }
}
