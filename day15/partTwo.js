const {input} = require('./input');
const Heap = require("heap");

const initialMap = input.split('\n').map((row) => row.split("").map(Number));

function increaseGrid(grid) {
	let new_grid = [];
    for(let i = 0; i < grid.length; i++){
        const newTempGrid = [];
        for(let j = 0; j < grid[0].length; j++){
            let new_vale = grid[i][j] + 1;
		    if (new_vale > 9) {
			  new_vale = 1;
		    }
            newTempGrid.push(new_vale);
        }
        new_grid.push(newTempGrid)
    }


	return new_grid;
}

function concatGrids(Grids){
    let updateGrid = [];
    for(let a = 0; a < Grids.length; a++){
        const minGrids = Grids[a];
        let updatedRow = new Array(minGrids[0].length).fill(0);
        for (let i = 0; i < minGrids.length; i++) {
            for(let j = 0; j < minGrids[i].length; j++){
                if(!updatedRow[j]){
                    updatedRow[j] = minGrids[i][j]
                }else{
                    updatedRow[j] = updatedRow[j].concat(minGrids[i][j])
                }
            }
        }

        // Finally join all rows together
        updateGrid = updateGrid.concat(updatedRow);
    }
    return updateGrid;
}

function buildGridOutDiagonally(grid, copies = 5) {
	let row_of_grids = [grid];
	// The first row requires the most amount of work, because we only get to reuse the first cell
	for (let x = 1; x < copies; x++) {
		let last_col = row_of_grids[row_of_grids.length - 1];
		row_of_grids = [...row_of_grids,increaseGrid(last_col)];
	}

	let rows = [row_of_grids];

	// After that, we can reuse all except 1 of the previously generated grids in the next row
	for (let y = 1; y < copies; y++) {
		let last_row = rows[rows.length - 1];

        const new_row = [];

        for(let miniGrid of last_row){
		    new_row.push(increaseGrid(miniGrid));
        }

		rows.push(new_row);
	}

	/**
	 * Now concatenate all rows to create wide "1 col" row strings,
	 * then join on '\n' to create a GIANT grid we can load into a new grid.
	 */

    const giant_grid_input = concatGrids(rows);

	// Load this new input to create our new larger grid to pathfind on
    return giant_grid_input
}

const grid = buildGridOutDiagonally(initialMap);

const gridLength = grid.length;
const subRowLength = grid[0].length;

function inBound(x, y){
    return x < gridLength && y < subRowLength && x >= 0 && y >= 0
}

function getNeighbors(x, y){
    let neighborsCells = [];
    if(!inBound(x, y)){
        return neighborsCells;
    }

    const possibleNeighborsCells = [
        { x: x+1, y },
        { x, y: y+1 },
        { x: x-1, y },
        { x, y: y-1 }
    ]

    neighborsCells = possibleNeighborsCells.filter((cell) => inBound(cell.x, cell.y));
    return neighborsCells;
}

function PartTwo(){
    const risksHeap = new Heap((a, b) => a.riskValue - b.riskValue );
    const riskTracker = new Map();
    const startNeighbors = getNeighbors(0,0);

    startNeighbors.forEach((cell) => {
        risksHeap.push({ name: `${cell.x},${cell.y}`, riskValue: grid[cell.x][cell.y] });
    })

    while(!risksHeap.empty()){
        const current = risksHeap.pop();
        const [x, y] = current['name'].split(',').map(Number);
        const neighbors = getNeighbors(x,y);
        neighbors.forEach((cell) => {
            const newRisk = grid[cell.x][cell.y] + current['riskValue'];
            if(!riskTracker.get(`${cell.x},${cell.y}`) || riskTracker.get(`${cell.x},${cell.y}`) > newRisk){
                riskTracker.set(`${cell.x},${cell.y}`, newRisk)
                risksHeap.push({ name:  `${cell.x},${cell.y}`, riskValue: newRisk});
            }
        })
    }

    console.log({
        result: riskTracker.get(`${gridLength-1},${subRowLength-1}`),
    })
}

PartTwo();
