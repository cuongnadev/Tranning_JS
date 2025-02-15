import { Button, buttonSizes, buttonVariants } from '../Button';
import { createContainer } from '~/utils';
import { dropdownIcon } from '~/constants';

export class Pagination {
    constructor(onPageChange) {
        this.startPage = 1;
        this.currentPage = 1;
        this.totalPages = 100;
        this.onPageChange = onPageChange;

        this.containerPagination = document.createElement('div');
        this.containerPagination.className = 'pagination-container flex items-center justify-between';

        // title
        this.title = document.createElement('p');
        this.title.className = 'pagination-title';
        this.title.innerHTML = '';
        this.setTitle(this.startPage);

        // actions
        this.actions = document.createElement('div');
        this.actions.className = 'pagination-actions flex items-center gap-4';
        // dropdown left
        this.dropdownLeft = new Button(
            null,
            dropdownIcon,
            null,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'dropdown-left',
            () => this.changePage(this.currentPage - 1),
        );
        this.actions.append(this.dropdownLeft.render());

        this.pageButtonsContainer = document.createElement('div');
        this.pageButtonsContainer.className = 'flex items-center gap-4';
        this.actions.append(this.pageButtonsContainer);

        this.dropdownRight = new Button(
            null,
            null,
            dropdownIcon,
            buttonVariants.iconOnly,
            buttonSizes.iconOnly,
            'dropdown-right',
            () => this.changePage(this.currentPage + 1),
        );
        this.actions.append(this.dropdownRight.render());

        this.containerPagination.append(this.title, this.actions);

        this.updatePageButtons(this.startPage, this.startPage + 2);
    }

    updatePageButtons(startPage, endPage) {
        this.pageButtonsContainer.innerHTML = '';

        // Tạo các nút trang
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = new Button(
                i,
                null,
                null,
                this.currentPage === i ? buttonVariants.filled : buttonVariants.outlined,
                buttonSizes.iconOnly,
                `page-button ${this.currentPage === i ? 'filled' : 'outline'}`,
                () => this.changePage(i),
            );
            this.pageButtonsContainer.append(pageButton.render());
        }
    }

    changePage(newPage) {
        if (newPage < 1 || newPage > this.totalPages) return;
        this.currentPage = newPage;
        this.onPageChange(this.currentPage);
        if (this.currentPage > this.startPage + 2) {
            this.startPage = this.currentPage;
            this.updatePageButtons(this.startPage, this.startPage + 2);
            this.setTitle(this.startPage);
        } else if (this.currentPage < this.startPage) {
            this.startPage = this.currentPage - 2;
            this.updatePageButtons(this.startPage, this.startPage + 2);
            this.setTitle(this.startPage);
        } else {
            this.updatePageButtons(this.startPage, this.startPage + 2);
        }
    }

    setTitle(startPage) {
        this.title.innerHTML = `Showing <span>${startPage}-${startPage + 2}</span> from <span>100</span> data`;
    }

    render() {
        return this.containerPagination;
    }
}
