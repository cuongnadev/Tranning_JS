import { createContainer } from '~/utils';
import { Toast } from '~/views/components/Toast';

export class LoginLayout {
    /**
     *
     * @param {LoginForm | RegisterForm} form
     */
    constructor(form) {
        // login_layout

        // global container
        this.container = createContainer('login_layout-container');

        // toast
        this.toast = document.createElement('div');
        this.toast.className = 'toast-container';

        // form
        this.form = form;

        // add elements to global container
        this.container.append(this.form.render(), this.toast);
    }

    render() {
        return this.container;
    }
}
