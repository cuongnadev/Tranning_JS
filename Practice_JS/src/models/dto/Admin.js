import { DTOMethods } from '../common';

export const AdminType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
};

export const AdminAuthenticationRequestType = {
    email: '',
    password: '',
};

export const AdminRegisterRequestType = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
};

export class Admin extends DTOMethods {
    /**
     *
     * @param {typeof AdminType}
     */
    constructor({ id, firstName, lastName, email, password, address }) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
    }

    /**
     * Returns the type of AdminAuthenticationRequest.
     * @returns {AdminAuthenticationRequestType}
     */
    getAuthenticationBody() {
        return {
            email: this.email,
            password: this.password,
        };
    }

    /**
     * Returns the type of RegisterAuthenticationRequest.
     * @returns {RegisterAuthenticationRequestType}
     */
    getRegisterBody() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            address: this.address,
        };
    }
}
