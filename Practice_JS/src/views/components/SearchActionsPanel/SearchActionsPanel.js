import { createContainer } from '~/utils';
import { Button, Search, buttonSizes, buttonVariants } from '~/views/components';
import { dropdownIcon, plusIcon } from '~/constants';
import { Router } from '~/routes';

export class SearchActionsPanel {
    constructor(label, routes) {
        this.container = document.createElement('div');
        this.container.className = 'search-actions-panel-container flex items-center justify-between';

        // search
        this.search = new Search();

        // Action
        // button sort
        this.sortButton = new Button(
            'Newest',
            null,
            dropdownIcon,
            buttonVariants.outlined,
            buttonSizes.md,
            'sort-button',
            () => {},
        );
        // button create new
        this.newStudentButton = new Button(
            label,
            plusIcon,
            null,
            buttonVariants.filled,
            buttonSizes.md,
            'new-student-button',
            routes ? () => Router.pushState(routes) : () => {},
        );
        this.actionButtonContainer = createContainer(
            'actions-button-container flex items-center gap-6',
            this.sortButton.render(),
            this.newStudentButton.render(),
        );

        this.container.append(this.search.render(), this.actionButtonContainer);
    }

    render() {
        return this.container;
    }
}
