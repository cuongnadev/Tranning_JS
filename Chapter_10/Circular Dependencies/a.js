import { initB } from './b.js';

export let name = 'module a';
export let bDep = {};

export function initA(b) {
    bDep = b;
    console.log('In module a, b:', b);
}

initB();
