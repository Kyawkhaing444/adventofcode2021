let rawInput = `target area: x=102..157, y=-146..-90`;

// rawInput = `target area: x=20..30, y=-10..-5`

let [, x1, x2, y1, y2] = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(
		rawInput
	);
	[x1, x2, y1, y2] = [x1, x2, y1, y2].map((v) => parseInt(v, 10));

	if (x1 > x2) {
		[x1, x2] = [x2, x1];
	}

	if (y1 > y2) {
		[y1, y2] = [y2, y1];
	}

const input  = { x: [x1, x2], y: [y1, y2] };

module.exports = {
	input,
};
