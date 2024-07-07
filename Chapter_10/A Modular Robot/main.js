import { VillageState } from './villageState.js';
import { randomRobot, routeRobot, goalOrientedRobot, improvedRobot, compareRobots } from './robots.js';

compareRobots(randomRobot, [], routeRobot, []);
compareRobots(randomRobot, [], goalOrientedRobot, []);
compareRobots(routeRobot, [], goalOrientedRobot, []);
compareRobots(goalOrientedRobot, [], improvedRobot, []);
