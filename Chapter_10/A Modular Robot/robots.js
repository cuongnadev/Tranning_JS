import { randomPick, findRoute } from './utility.js';
import { VillageState } from './villageState.js';
import { roadGraph } from './graph.js';

export function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

export function compareRobots(robot1, memory1, robot2, memory2) {
    let totalTurnsRobot1 = 0;
    let totalTurnsRobot2 = 0;
    for (let i = 0; i < 100; i++) {
        let task = VillageState.random();
        totalTurnsRobot1 += runRobot(task, robot1, memory1);
        totalTurnsRobot2 += runRobot(task, robot2, memory2);
    }
    console.log(`Robot 1 average steps: ${totalTurnsRobot1 / 100}`);
    console.log(`Robot 2 average steps: ${totalTurnsRobot2 / 100}`);
}

export function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

export function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

export function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

export function improvedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {route: findRoute(roadGraph, place, parcel.place), pickUp: true};
            } else {
                return {route: findRoute(roadGraph, place, parcel.address), pickUp: false};
            }
        });

        function score({route, pickUp}) {
            return pickUp ? route.length : route.length * 2;
        }

        route = routes.reduce((a, b) => score(a) < score(b) ? a : b).route;
    }
    return {direction: route[0], memory: route.slice(1)};
}
