import { publicRoutes } from './routes';
import { Admin } from '~/models/dto';
import { AdminRepository } from '~/models/repositories';

export class Router {
    constructor() {
        // Listen to browser back/forward navigation (popstate event)
        window.addEventListener('popstate', () => {
            window.dispatchEvent(new CustomEvent('urlChanged'));
        });
        // When URL changes, route to the corresponding component
        window.addEventListener('urlChanged', () => {
            Router.routeToMatchingComponent();
        });

        // get data from local storage
        let admin = localStorage.getItem('admin');
        if (admin) {
            AdminRepository.authentication(new Admin(JSON.parse(admin)), {
                isKeepLogged: true, // true cause data is from local storage
                autoNavigate: false, // do not automatically redirect after authentication
                isAlert: false, // do not show notification or warning after authentication
                result: this.authenticationResult,
            });
            return;
        }

        // get data from session storage
        admin = sessionStorage.getItem('admin');
        if (admin) {
            AdminRepository.authentication(new Admin(JSON.parse(admin)), {
                isKeepLogged: false,
                autoNavigate: false,
                isAlert: false,
                result: this.authenticationResult,
            });
            return;
        }

        // If the current path is not /login or /register, redirect to /login
        // if pathname is included, direct to current pathname
        const path = ['/login', '/register'].some((item) => item === location.pathname) ? location.pathname : '/login';
        Router.pushState(path);
    }

    /**
     * Callback for authentication result.
     * If authenticated, redirect to the root or current page.
     * Otherwise, redirect to the login page.
     */
    authenticationResult(isAuthenticated) {
        if (isAuthenticated) {
            // prevent access authentication page if it's already authenticated
            const path = ['/login', '/register'].some((item) => item === location.pathname) ? '/' : location.pathname;
            Router.pushState(path);
        } else {
            // If authentication fails, redirect to login page
            Router.pushState('/login');
        }
    }

    /**
     * Renders the matching component based on the current URL path.
     * If no matching component is found, it displays "Not Found".
     */
    static routeToMatchingComponent() {
        const app = document.querySelector('#app');
        const { childNode } = Router.findRoute();

        if (childNode) {
            return app.replaceChildren(childNode);
        }

        return app.replaceChildren('Not Found');
    }

    /**
     * Finds the matching route based on the current URL path.
     * Returns the matching component and any associated parameters.
     */
    static findRoute() {
        let [childNode, componentPath, params] = [null, null, null];
        const urlPath = window.location.pathname;
        for (const route1 of publicRoutes) {
            if (route1.children) {
                for (const route2 of route1.children) {
                    componentPath = `${route1.path}${route2.path}`;
                    if (Router.matchPath(urlPath, componentPath)) {
                        params = Router.extractParams(urlPath, componentPath);
                        if (Object.keys(params).length !== 0) {
                            childNode = new route2.component();
                        } else {
                            childNode = new route2.component();
                        }
                        childNode = route1.component.render(childNode);
                        return { childNode, componentPath, params };
                    }
                }
            } else {
                componentPath = route1.path;
                if (Router.matchPath(urlPath, componentPath)) {
                    childNode = route1.component.render();
                    params = Router.extractParams(urlPath, componentPath);
                    return { childNode, componentPath, params };
                }
            }
        }
        return { childNode, componentPath, params };
    }

    /**
     * Retrieves the URL parameters from the current URL path.
     * Returns an object containing the extracted parameters.
     */
    static getParams() {
        const urlPath = window.location.pathname;
        let [componentPath, params] = [null, null];

        for (const route1 of publicRoutes) {
            if (route1.children) {
                for (const route2 of route1.children) {
                    componentPath = `${route1.path}${route2.path}`;
                    if (Router.matchPath(urlPath, componentPath)) {
                        params = Router.extractParams(urlPath, componentPath);
                        return params;
                    }
                }
            } else {
                componentPath = route1.path;
                if (Router.matchPath(urlPath, componentPath)) {
                    params = Router.extractParams(urlPath, componentPath);
                    return params;
                }
            }
        }
    }

    /**
     * Compares a given URL and route path to check if they match.
     * Supports dynamic URL segments, e.g., /products/:id.
     */
    static matchPath(url, path, isEqualLength = true) {
        const urlSegments = url.split('/');
        const pathSegments = path.split('/');

        if (urlSegments.length !== pathSegments.length && isEqualLength) {
            return false;
        }

        const len = Math.min(urlSegments.length, pathSegments.length);

        for (let i = 0; i < len; i++) {
            if (pathSegments[i].startsWith(':')) {
                const isStaticValue = ['add', 'edit'].includes(urlSegments[i]);
                if (isStaticValue) {
                    return false;
                }
            } else if (urlSegments[i] !== pathSegments[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Extracts dynamic parameters from the given URL and route path.
     * For example, for /products/123 and /products/:id, the result would be { id: '123' }.
     */
    static extractParams(url, path) {
        const urlSegments = url.split('/');
        const routeSegments = path.split('/');
        const params = {};

        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                const paramKey = routeSegments[i].slice(1);
                params[paramKey] = urlSegments[i];
            }
        }

        return params;
    }

    /**
     * Updates the browser's history state to the given URL and triggers the urlChanged event.
     */
    static pushState(url) {
        window.history.pushState(null, null, url);
        window.dispatchEvent(new CustomEvent('urlChanged'));
    }

    /**
     * A utility to manipulate URL search parameters (query strings) in the current URL.
     * Allows custom actions on the URL search parameters without reloading the page.
     */
    static urlSearchParams(action) {
        const url = new URL(window.location);
        const searchParams = new URLSearchParams(url.search);

        action(searchParams);

        const updatedSearchParams = searchParams.toString();
        if (url.search !== `?${updatedSearchParams}`) {
            url.search = updatedSearchParams;
            window.history.pushState(null, '', url);
        }
    }

    /**
     * Sets a search parameter in the current URL (e.g., ?key=value).
     */
    static setSearchParam(key, value) {
        Router.urlSearchParams((searchParams) => {
            searchParams.set(key, value);
        });
    }

    /**
     * Retrieves the value of a specific search parameter from the current URL.
     */
    static getSearchParam(key) {
        let searchParamValue;
        Router.urlSearchParams((searchParams) => {
            searchParamValue = searchParams.get(key);
        });
        return searchParamValue;
    }

    /**
     * Deletes a specific search parameter from the current URL.
     */
    static deleteSearchParam(key) {
        Router.urlSearchParams((searchParams) => {
            searchParams.delete(key);
        });
    }
}
