import { Search } from '~/views/components';
import { headerActions } from './HeaderActions';

export class Header {
    // Header
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'header-container flex items-center';

        // header title
        this.title = document.createElement('h2');
        this.title.className = 'header-title';

        this.search = new Search();

        this.headerActions = new headerActions();
        this.container.append(this.title, this.search.render(), this.headerActions.render());
    }

    render(title) {
        this.title.innerText = title;
        return this.container;
    }
}
