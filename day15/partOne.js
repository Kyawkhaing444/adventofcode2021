const {input} = require("./input");

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

function getLowestNode({risksMap, visited}){
    return [...risksMap].reduce((lowestNode, risk) => {
        if(lowestNode === null || lowestNode > risk[1]){
            if(!visited.includes(risk[0])){
                lowestNode = risk;
            }
        }
        return lowestNode;
    }, null)
}

function PartOne(){
    const risksMap = new Map();
    const visited = [];
    const startNeighbors = getNeighbors(0,0);
    startNeighbors.forEach((cell) => {
        risksMap.set(`${cell.x},${cell.y}`, grid[cell.x][cell.y]);
    })

   let lowestNode = getLowestNode({risksMap, visited});

    while(lowestNode){
        const [x, y] = lowestNode[0].split(',').map(Number);
        const neighbors = getNeighbors(x,y);
        neighbors.forEach((cell) => {
            const newRisk = grid[cell.x][cell.y] + risksMap.get(`${x},${y}`);
            if(!risksMap.get(`${cell.x},${cell.y}`)){
                risksMap.set(`${cell.x},${cell.y}`, newRisk)
            }
            if(risksMap.get(`${cell.x},${cell.y}`) > newRisk){
                risksMap.set(`${cell.x},${cell.y}`, newRisk)
            }
        })
        visited.push(lowestNode[0]);
        if(lowestNode[0] !== `${gridLength-1},${subRowLength-1}`){
            risksMap.delete(lowestNode[0])
        }
        lowestNode = getLowestNode({risksMap, visited})
    }

    console.log({
        result: risksMap.get(`${gridLength-1},${subRowLength-1}`),
    })
}

PartOne();
