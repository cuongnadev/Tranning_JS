export class RightSidebar {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'right-sidebar';
    }

    render(...children) {
        this.container.append(...children);
        return this.container;
    }
}
