export class Form {
    constructor() {
        this.form = document.createElement('form');
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    /**
     *
     * @param {Function} action
     */
    onSubmit(action) {
        this.form.addEventListener('submit', () => {
            action();
        });
    }
}
