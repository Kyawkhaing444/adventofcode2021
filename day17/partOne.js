const {input} = require("./input");

function isLanded(initialX, initialY, dataInput){
    let xv = initialX;
	let yv = initialY;

	let x = 0;
	let y = 0;

	const lowestY = Math.min(...dataInput.y);
	let maxY = y;

	while (y > lowestY) {
		x += xv;
		y += yv;

		if (y > maxY) {
			maxY = y;
		}

		xv += xv === 0 ? 0 : xv > 0 ? -1 : 1;
		yv--;

		if (x >= dataInput.x[0] && x <= dataInput.x[1] && y >= dataInput.y[0] && y <= dataInput.y[1]) {
			return {
				maxY,
				xv: initialX,
				yv: initialY,
			};
		}
	}
}

function findValidRoute(){
    const lowestY = Math.min(...input.y);
    const highestX = Math.max(...input.x);

    let solutions = []
    for(let i = 0; i < highestX + 1; i++){
        for(let j = lowestY; j <= 1000; j++){
            const landedMap = isLanded(i, j, input);
            if(landedMap){
                solutions.push(landedMap);
            }
        }
    }
    return solutions;
}

const routes = findValidRoute();

const {maxY} = routes.sort((a,b) => b.maxY - a.maxY)[0];

console.log({
    maxY
})

module.exports = {
	findValidRoute
};
