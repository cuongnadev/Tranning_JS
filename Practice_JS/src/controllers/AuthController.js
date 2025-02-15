import { Router } from '~/routes';

export class AuthController {
    static logout() {
        sessionStorage.clear();
        localStorage.clear();
        Router.pushState('/login');
    }
}
