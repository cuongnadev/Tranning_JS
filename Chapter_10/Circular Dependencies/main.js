import { name as aName, bDep as aBDep, initA } from './a.js';
import { name as bName, aDep as bADep, initB } from './b.js';

initA({ name: bName, aDep: bADep });
initB();

console.log('In main, a:', { name: aName, bDep: aBDep });
console.log('In main, b:', { name: bName, aDep: bADep });
