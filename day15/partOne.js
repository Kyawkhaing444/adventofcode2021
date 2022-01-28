const {input} = require("./input");
const Heap = require("heap");

const grid = input.split("\n").map((row) => row.split("").map(Number));
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

function PartOne(){
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

PartOne();
