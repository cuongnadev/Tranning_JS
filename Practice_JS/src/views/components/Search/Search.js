import { createContainer } from '~/utils';
import { Button, Input, buttonSizes, buttonVariants } from '~/views/components';
import { searchIcon } from '~/constants';
export class Search {
    constructor() {
        this.searchInput = new Input(
            {
                placeholder: 'Search here...',
                type: 'text',
                onchange: () => {},
            },
            'search-input',
        );
        this.searchIcon = new Button(
            null,
            searchIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'action-btn search-btn',
            () => {},
        );
        this.search = createContainer(
            'search-container flex items-center',
            this.searchIcon.render(),
            this.searchInput.render(),
        );
    }
    render() {
        return this.search;
    }
}
