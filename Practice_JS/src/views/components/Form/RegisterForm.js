import { createContainer, handleEmailFormat, handlePasswordFormat } from '~/utils';
import { Link } from '../Link';
import { Input } from '../Input';
import { Button, buttonSizes, buttonVariants } from '../Button';
import { Checkbox } from './Checkbox';
import { Form } from './Form';

export class RegisterForm extends Form {
    constructor() {
        super();

        // global container
        this.container = createContainer('form-container');

        // container 1 children
        // 1. Title 1
        this.title1 = document.createElement('h1');
        this.title1.className = 'form-title-1';
        this.title1.textContent = 'Register';
        // container 1
        this.container1 = createContainer('form-register-container-1', this.title1);

        /* <======= form children =======> */
        // 1. Your Name
        // 1.1 Title 3.1
        this.title3_1 = document.createElement('p');
        this.title3_1.className = 'form-title-3';
        this.title3_1.textContent = 'Personal Information';
        // First name input
        this.firstNameInput = new Input({ placeholder: 'First Name', required: true }, 'form-input');
        // 1.2 Last name input
        this.lastNameInput = new Input({ placeholder: 'Last Name', required: true }, 'form-input');

        // 1.3 Email input
        this.emailInput = new Input(
            {
                placeholder: 'Email',
                required: true,
                onchange: () => handleEmailFormat(this.emailInput.input),
            },
            'form-input',
        );
        // 1.4 Password input
        this.passwordInput = new Input(
            {
                placeholder: 'Password',
                type: 'password',
                required: true,
                onchange: () => handlePasswordFormat(this.passwordInput.input),
            },
            'form-input',
        );
        // 1.5 Address input
        this.addressInput = new Input({ placeholder: 'Address', required: true }, 'form-input');

        // 2. Term & conditions checkbox
        // 2.1. Term & conditions link
        this.termConditionLink = new Link('#');
        this.termConditionLink.link.className = 'form-link';
        this.termConditionLink.link.textContent = 'Terms & Conditions';
        // 2.2. Term & conditions checkbox
        this.termConditionCheckbox = new Checkbox('acceptTerm', 'form-checkbox', [
            "By clicking 'Register' you agree to our website ",
            this.termConditionLink.render(),
            '.',
        ]);
        this.termConditionCheckbox.checkbox.required = true;

        // 3. Register button
        this.registerButton = new Button('Register', null, null, buttonVariants.filled, buttonSizes.sm, '', () => {});

        // 4. Login link
        this.login = document.createElement('p');
        this.loginLink = new Link('/login');
        this.loginLink.link.className = 'form-link';
        this.loginLink.link.textContent = 'Login';
        this.login.append('Already have an account? ', this.loginLink.render());

        // form
        this.form.append(
            this.title3_1,
            this.firstNameInput.render(),
            this.lastNameInput.render(),
            this.emailInput.render(),
            this.passwordInput.render(),
            this.addressInput.render(),
            this.termConditionCheckbox.render(),
            this.registerButton.render(),
            this.login,
        );

        // add elements to global container
        this.container.append(this.container1, this.form);
    }

    render() {
        return this.container;
    }
}
