import { createContainer } from '~/utils';

export class OverviewItem {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'overview-item flex items-center';

        this.title = document.createElement('p');
        this.title.className = 'overview-item-title';

        this.quantity = document.createElement('p');
        this.quantity.className = 'overview-item-quantity';

        this.textContent = createContainer(
            'overview-item-text-content flex flex-col items-start',
            this.title,
            this.quantity,
        );

        this.icon = document.createElement('div');
        this.icon.className = 'overview-item-icon flex items-center justify-center';

        this.container.append(this.icon, this.textContent);
    }

    render(title, quantity, icon, ...classname) {
        this.title.innerText = title;
        this.quantity.innerText = quantity;
        this.icon.innerHTML = icon;
        this.container.classList.add(...classname);
        return this.container;
    }
}
