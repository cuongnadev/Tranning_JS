import { createContainer } from '~/utils';

export class Checkbox {
    /**
     *
     * @param {string} id
     * @param {string} className
     * @param {any[]} labelChildren
     */
    constructor(id, className, labelChildren) {
        this.labelChildren = labelChildren;
        this.id = id;

        // 1. Checkbox
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';
        this.checkbox.id = this.id;

        // 2. Label
        this.label = document.createElement('label');
        this.label.htmlFor = this.id;
        this.label.append(...labelChildren);

        // 3. Container
        this.container = createContainer(className, this.checkbox, this.label);
    }

    render() {
        return this.container;
    }
}
