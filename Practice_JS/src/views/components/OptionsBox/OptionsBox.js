import { dropdownIcon } from '~/constants';

export const optionType = {
    value: '',
    label: '',
};

export const optionsBoxType = {
    options: [optionType],
    initialOption: 0,
};

export class OptionsBox {
    /**
     * @callback onChangeCallBack
     * @param {typeof optionType} param0 - The selected index.
     * @return {void}
     */

    /**
     * @param {typeof optionType | "none"} defaultOption - The default option to display when no option is selected.
     * @param {number} initialOption - The index of the default option to be selected initially.
     * @param {(typeof optionType)[]} [options=[]] - An array of options to be displayed in the dropdown.
     * @param {onChangeCallBack} [onChange] - A callback function triggered when an option is selected.
     */
    constructor(
        defaultOption,
        initialOption,
        options,
        onChange = ({ label, value }) => {
            label, value;
        },
    ) {
        this.defaultOption = defaultOption; // The default label displayed when no option is selected
        this.currentIndex = initialOption; // The index of the currently selected option
        this.options = options; // Array of options to be displayed
        this.onChange = onChange; // Callback function triggered when an option is selected
        this.isDisplayed = false; // Flag indicating whether the dropdown is currently displayed

        // Create the main select box element
        this.selectBox = document.createElement('button');
        this.selectBox.className = 'select-container';
        this.selectBox.addEventListener('click', (event) => {
            event.stopPropagation();
            this.displayDropDown(!this.isDisplayed);
        });

        // Create an element to display the selected option's text
        this.selectedText = document.createElement('div');
        this.selectedText.className = 'select-selected_text';

        // Create an icon container for the dropdown arrow
        this.iconContainer = document.createElement('div');
        this.iconContainer.className = 'select-icon';
        this.iconContainer.innerHTML = dropdownIcon; // Assuming `chevronDownIcon` is defined elsewhere

        // Append elements to the main select box
        this.selectBox.append(this.selectedText, this.iconContainer);

        // Create a container for the dropdown options
        this.dropDownContainer = document.createElement('div');
        this.dropDownContainer.className = 'select-option-container';
        this.dropDownContainer.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Close the dropdown when clicking outside the select box
        window.addEventListener('click', () => {
            if (this.isDisplayed) {
                this.displayDropDown(false);
            }
        });

        // Initialize the options
        this.initOptions();
    }

    /**
     * Initializes the option buttons based on provided options.
     * @private
     */
    initOptions() {
        /** @type {HTMLButtonElement[]} */
        this.optionNodes = []; // Array to hold the option button elements

        // 1. Create the default option button if it's provided
        if (this.defaultOption !== 'none') {
            const { value, label } = this.defaultOption;

            const defaultOptionButton = document.createElement('button');
            defaultOptionButton.className = 'select-option-button';
            defaultOptionButton.textContent = label;
            defaultOptionButton.addEventListener(
                'click',
                this.onClickOption.bind(this, { value, label }, this.optionNodes.length),
            );
            this.optionNodes.push(defaultOptionButton);
        }

        // 2. Create option buttons for each option in the provided array
        this.options.forEach(({ value, label }) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'select-option-button';
            optionButton.textContent = label;

            // use the length of the array to specific the index of the option
            optionButton.addEventListener(
                'click',
                this.onClickOption.bind(this, { value, label }, this.optionNodes.length),
            );

            // push node into the array
            this.optionNodes.push(optionButton);
        });

        // Render the options
        this.renderOptions();

        // Append the option buttons to the dropdown container
        this.dropDownContainer.append(...this.optionNodes);

        // Set the initial selected text
        this.selectedText.textContent = this.optionNodes[this.currentIndex].textContent;
    }

    /**
     * Renders the option buttons, highlighting the selected option.
     */
    renderOptions() {
        const selectedButtonClassName = 'select-option-button-current';
        this.optionNodes.forEach((optionNode, index) => {
            if (index === this.currentIndex) {
                optionNode.classList.add(selectedButtonClassName);
                this.selectedText.textContent = optionNode.textContent;
            } else {
                optionNode.classList.remove(selectedButtonClassName);
            }
        });
    }

    /**
     * Toggles the display of the dropdown.
     * @param {boolean} isDisplay - Flag indicating whether to display the dropdown or not.
     */
    displayDropDown(isDisplay) {
        const expandedIconClassName = 'select-icon-expanded';
        if (isDisplay) {
            this.selectBox.appendChild(this.dropDownContainer);
            this.iconContainer.classList.add(expandedIconClassName);
        } else {
            this.selectBox.removeChild(this.dropDownContainer);
            this.iconContainer.classList.remove(expandedIconClassName);
        }
        this.isDisplayed = isDisplay;
    }

    /**
     * Handles the click event on an option button.
     * @param {typeof optionType} param0 - The value and the label of the selected option.
     * @param {number} optionIndex - The index of the selected option.
     */
    onClickOption({ value, label }, optionIndex) {
        this.currentIndex = optionIndex;
        this.renderOptions();
        this.displayDropDown(false);
        this.onChange({ value, label });
    }

    /**
     * Renders the select box element.
     * @returns {HTMLElement} - The select box element.
     */
    render() {
        return this.selectBox;
    }
}
