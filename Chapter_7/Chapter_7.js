const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
}

function compareRobots(robot1, memory1, robot2, memory2) {
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

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedRobot({place, parcels}, route) {
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

// Improved Robot
function improvedRobot({place, parcels}, route) {
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
// Test VillageState.random
console.log(VillageState.random(5));

// Test runRobot with a simple robot
console.log(runRobot(VillageState.random(), randomRobot, []));

// Measuring a Robot
// Compare random robot and route robot
compareRobots(randomRobot, [], routeRobot, []);
// Compare random robot and goal oriented robot
compareRobots(randomRobot, [], goalOrientedRobot, []);
// Compare route robot and goal oriented robot
compareRobots(routeRobot, [], goalOrientedRobot, []);

// Robot Efficiency
// Compare goalOrientedRobot and improvedRobot
compareRobots(goalOrientedRobot, [], improvedRobot, []);



// Persistent Group
class PGroup {
    constructor(members) {
        this.members = members;
    }

    add(value) {
        if (this.has(value)) return this;
        return new PGroup(this.members.concat([value]));
    }

    delete(value) {
        if (!this.has(value)) return this;
        return new PGroup(this.members.filter(m => m !== value));
    }

    has(value) {
        return this.members.includes(value);
    }

    static get empty() {
        return new PGroup([]);
    }
}

// Usage
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b")); // true
console.log(a.has("b")); // false
console.log(b.has("a")); // false