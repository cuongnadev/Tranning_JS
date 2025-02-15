export class Dropdown {
    constructor() {
        this.open = false;
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'dropdown-container hidden';
    }
    init(triggerElement, dropdownLinks) {
        // Dropdown Trigger
        this.trigger = triggerElement;
        this.trigger.classList.add('dropdown-trigger');
        this.trigger.dropdownInstance = this;

        // Dropdown Content
        this.content = document.createElement('div');
        this.content.className = 'dropdown-content';

        // Dropdown Link
        dropdownLinks.forEach((link) => {
            const dropdownLink = document.createElement('a');
            dropdownLink.href = link.href;
            dropdownLink.className = 'dropdown-link';
            dropdownLink.innerText = link.label;
            this.content.appendChild(dropdownLink);

            dropdownLink.addEventListener('click', (event) => {
                event.preventDefault();
                link.action();
            });
        });

        this.dropdown.appendChild(this.content);
        this.trigger.appendChild(this.dropdown);

        this.trigger.addEventListener('click', this.toggleOpen.bind(this));
    }

    toggleOpen(event) {
        event.stopPropagation();

        if (this.open) {
            this.open = !this.open;
        } else {
            Dropdown.closeAllDropdown();
            this.open = !this.open;
        }

        this.updateDropdownState();

        if (this.open) {
            document.addEventListener('click', this.handleClickOutside.bind(this), { once: true });
        }
    }

    updateDropdownState() {
        if (this.open) {
            this.dropdown.classList.remove('hidden');
        } else {
            this.dropdown.classList.add('hidden');
        }
    }

    handleClickOutside(event) {
        if (this.open && !this.dropdown.contains(event.target)) {
            this.open = false;
            this.updateDropdownState();
        }
    }

    static closeAllDropdown() {
        const dropdowns = document.querySelectorAll('.dropdown-trigger');
        dropdowns.forEach((trigger) => {
            const instance = trigger.dropdownInstance;
            if (instance && instance.open) {
                instance.open = false;
                instance.updateDropdownState();
            }
        });
    }
}
