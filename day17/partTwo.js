const {findValidRoute} = require('./partOne');

const routes = findValidRoute();

console.log({routes: routes.length});
