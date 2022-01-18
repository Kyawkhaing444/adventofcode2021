const {input} = require('./input');
const heightMap = input.split('\n').map((row) => row.split("").map(Number));

const mapLength = heightMap.length;
const subMapLength = heightMap[0].length;


function inBound(x, y){
    return x < mapLength && y < subMapLength && x >= 0 && y >= 0
}

function neighbors(x, y){
    let neighborsCells = [];
    if(!inBound(x, y)){
        return neighborsCells;
    }

    const possibleNeighborsCells = [
        { x: x+1, y },
        { x: x-1, y},
        { x, y: y-1 },
        { x, y: y+1 }
    ]

    neighborsCells = possibleNeighborsCells.filter((cell) => inBound(cell.x, cell.y));
    return neighborsCells;
}

function findLowPoints(){
    const lowPoints = heightMap.reduce((lowPoints, map, globalIndex) => {
        const subLowPoints = map.reduce((subLowPoints, height, index) => {
            const top = globalIndex + 1;
            const bottom = globalIndex - 1;
            const left = index - 1;
            const right = index + 1;
            if(top < mapLength){
                if(height >= heightMap[top][index]){
                    return subLowPoints;
                }
            }
            if(bottom >= 0){
                if(height >= heightMap[bottom][index]){
                    return subLowPoints
                }
            }
            if(left >= 0){
                if(height >= heightMap[globalIndex][left]){
                    return subLowPoints
                }
            }
            if(right < map.length){
                if(height >= heightMap[globalIndex][right]){
                    return subLowPoints
                }
            }
            subLowPoints.push({
                x: globalIndex,
                y: index
            })
            return subLowPoints
        }, []);
        return [...lowPoints, ...subLowPoints];
    }, []);
    return lowPoints;
}

function main(){
    const lowPoints = findLowPoints();

    const basins = lowPoints.reduce((basins, point) => {
        const queue = [point];
        const visited = new Set();
        visited.add(`${point.x},${point.y}`);
        while(queue.length > 0){
            const cell = queue.shift();
            const neighborCell = neighbors(cell.x, cell.y);
            neighborCell.forEach((nCell) => {
                if(heightMap[nCell.x][nCell.y] < 9 && !visited.has(`${nCell.x},${nCell.y}`)){
                    queue.push(nCell);
                    visited.add(`${nCell.x},${nCell.y}`)
                }
            })
        }
        basins.push(visited.size);
        return basins;
    }, [])

    basins.sort((a, b) => b - a);

    console.log(basins[0] * basins[1] * basins[2]);
}

main();
