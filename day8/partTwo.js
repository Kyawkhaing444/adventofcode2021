const {input} = require('./input');

const entrys = input.split('\n').map((line) => {
    let [wires, outputs] = line.split(" | ");
    wires = wires.split(" ").map((wire) => wire.split("").sort().join(''));
    outputs = outputs.split(" ").map((output) => output.split("").sort().join(''));
    return {
      wires,
      outputs
    }
})

const numbersSegments = {
	0: [1, 1, 1, 0, 1, 1, 1],
	1: [0, 0, 1, 0, 0, 1, 0],
	2: [1, 0, 1, 1, 1, 0, 1],
	3: [1, 0, 1, 1, 0, 1, 1],
	4: [0, 1, 1, 1, 0, 1, 0],
	5: [1, 1, 0, 1, 0, 1, 1],
	6: [1, 1, 0, 1, 1, 1, 1],
	7: [1, 0, 1, 0, 0, 1, 0],
	8: [1, 1, 1, 1, 1, 1, 1],
	9: [1, 1, 1, 1, 0, 1, 1],
};

const segmentsMap = Object.entries(numbersSegments).reduce((map, [num, seg])=> {
    map.set(seg, parseInt(num));
    return map;
}, new Map());

const numberGroupBySegLength = Object.entries(numbersSegments).reduce((map, [num, seg])=>{
    const segCount = seg.reduce((a, b) => a + b);
    if(!map.get(segCount)){
        map.set(segCount, []);
    }
    map.get(segCount).push(parseInt(num));
    return map;
}, new Map());

function uniqueSeg(firstSeg, secondSeg){
    const combineString = firstSeg + secondSeg;
    const countMap = combineString.split("").reduce((map, str) => {
        if(!map.get(str)){
            map.set(str, 0);
        }
        map.set(str, map.get(str) + 1);
        return map;
    }, new Map())
    let unique = "";
    for (const [key, value] of countMap.entries()) {
        if(value === 1){
            unique += key;
        }
    }
    return unique;
}

function reduceDuplicate(a, b) {
	const all_chars = [...a.split(''), ...b.split('')].sort();

	return [...new Set(all_chars)].join('');
}

function wiresOverlap({ bottom_wire, top_wire }) {
	return reduceDuplicate(bottom_wire, top_wire) === bottom_wire;
}

function intersectingSegments(wire_a, wire_b) {
    const combineString = wire_a + wire_b;
    const countMap = combineString.split("").reduce((map, str) => {
        if(!map.get(str)){
            map.set(str, 0);
        }
        map.set(str, map.get(str) + 1);
        return map;
    }, new Map())
    let duplicate = "";
    for (const [key, value] of countMap.entries()) {
        if(value > 1){
            duplicate += key;
        }
    }
    return duplicate;
}

const arraysAreEqual = (a, b) => a.join(',') === b.join(',');

function convertWireToNumber(mappingArr, wire){
    const map = mappingArr.reduce((map, item, index) => {
        map[item] = index;
        return map;
    }, {});

	// Start out with all segments turned off.
	const digit = Array(7).fill(0);
	for (let char of wire) {
		// Turn on the segment at the index based on their mapping
		digit[map[char]] = 1;
	}

	for (let [segments, answer] of segmentsMap) {
		if (arraysAreEqual(segments, digit)) {
			return answer;
		}
	}
}


function solveWires({ wires, outputs }){
    const wireByLength = wires.reduce((map, wire) => {
        if(!map.get(wire.length)){
            map.set(wire.length, [])
        }
        map.get(wire.length).push(wire);
        return map;
    }, new Map())

    // get unique seg with unique length 1, 4, 7, 8
    const uniqueLengthSegs = wires.reduce((map, wire) => {
        const size = wire.length;
        const number = numberGroupBySegLength.get(size);
        const wires_has_one_pos = number.length === 1;
        if(wires_has_one_pos){
            map.set(number[0], wire);
        }
        return map;
    }, new Map());

    let a, b, c, d, e, f, g;

    const c_f = uniqueLengthSegs.get(1);

    const b_d = uniqueSeg(uniqueLengthSegs.get(4), c_f);

    a = uniqueSeg(uniqueLengthSegs.get(7), c_f);

    const two_three_five = wireByLength.get(5);

    for (let wire of two_three_five ) {
		if (wiresOverlap({ bottom_wire: wire, top_wire: uniqueLengthSegs.get(7) })) {
			// Then `wire` is digit `3`
			let d_g = uniqueSeg(wire, uniqueLengthSegs.get(7));

			d = intersectingSegments(d_g, b_d);
			g = uniqueSeg(d_g, d);
			b = uniqueSeg(b_d, d);

			break;
		}
	}

    uniqueLengthSegs.set(9, [a, b, d, g, ...c_f].sort().join(''));
    e = uniqueSeg(uniqueLengthSegs.get(9), uniqueLengthSegs.get(8));

    let two_wire = wireByLength.get(5).find((wire) => wire.includes(e));
    uniqueLengthSegs.set(2, two_wire);
	if (wiresOverlap({ bottom_wire: uniqueLengthSegs.get(2), top_wire: c_f[0] })) {
		// `c` is the first segment of `c_or_f`
		c = c_f[0];
		f = c_f[1];
	} else {
		// `f` is the first segment of `c_or_f`
		f = c_f[0];
		c = c_f[1];
	}

    const solved_segment_mapping = [a, b, c, d, e, f, g];

    let num_sr = '';
	for (let output of outputs) {
		const num = convertWireToNumber(solved_segment_mapping, output);
		num_sr += num;
	}

    return parseInt(num_sr, 10);
}

function main(){
    const outputSum = entrys.reduce((sum, inputLine) => sum + solveWires(inputLine), 0);
    console.log({outputSum});
}

main();
