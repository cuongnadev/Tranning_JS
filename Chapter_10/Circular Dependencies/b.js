import { initA } from './a.js';

export let name = 'module b';
export let aDep = {};

export function initB() {
    initA({ name, aDep });
    aDep = { name: 'module a', bDep: { name, aDep } };
    console.log('In module b, a:', { name: 'module a', bDep: { name, aDep } });
}
