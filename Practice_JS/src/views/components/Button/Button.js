export const buttonVariants = {
    filled: 'btn-filled',
    outlined: 'btn-outlined',
    iconOnly: '',
};

export const buttonSizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    iconOnly: '',
};

/**USAGE:
 * use @param buttonVariants as argument for @param variant in @constructor
 * use @param buttonSizes as argument for @param sizes in @constructor
 * leave startIcon or endIcon or label null if its doesn't need
 * example:
 * const button = new Button("A button", startIcon, endIcon, buttonVariants.primary.filled, buttonSizes.md, "button-class-name", onClick)
 * const buttonElement = button.render();
 */
export class Button {
    constructor(label, startIcon, endIcon, variant, size, className, onClick = () => {}) {
        // button element
        this.button = document.createElement('button');
        this.button.className = Button.getClassName(variant, size, className);
        this.button.addEventListener('click', onClick);

        // label
        this.buttonLabel = document.createElement('span');
        this.buttonLabel.append(label);

        // svg icon
        this.startIcon = document.createElement('div');
        this.startIcon.innerHTML = startIcon;
        this.endIcon = document.createElement('div');
        this.endIcon.innerHTML = endIcon;

        // add children
        startIcon && this.button.append(this.startIcon.firstChild);
        label && this.button.append(this.buttonLabel);
        endIcon && this.button.append(this.endIcon.firstChild);
    }

    static getClassName(variant, size, ...classes) {
        const className = ['btn', variant, size, ...classes];
        return className.join(' ');
    }

    render() {
        return this.button;
    }
}
