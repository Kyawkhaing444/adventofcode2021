const {input} = require('./input');

const octopus = input.split('\n').map((row) => row.split("").map(Number));

const mapLength = octopus.length;
const subMapLength = octopus[0].length;

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
        { x, y: y+1 },
        { x: x-1, y: y-1 },
        { x: x-1, y: y+1 },
        { x: x+1, y: y-1 },
        { x: x+1, y: y+1 }
    ]

    neighborsCells = possibleNeighborsCells.filter((cell) => inBound(cell.x, cell.y));
    return neighborsCells;
}

function main(){
    let flashes = 0;
    for(let i = 0; i < 100; i++){
        const flashedOct = new Set();
        const subFlashes = octopus.reduce((subFlashes, octRow, row) => {
            const rowFlashes = octRow.reduce((rowFlashes, singleOct, col)=>{
                const queue = [{x: row, y: col}];
                while(queue.length > 0){
                    const point = queue.shift();
                    if(!flashedOct.has(`${point.x},${point.y}`)){
                        octopus[point.x][point.y]++;
                    }
                    if(octopus[point.x][point.y] > 9 && !flashedOct.has(`${point.x},${point.y}`)){
                        rowFlashes += 1;
                        flashedOct.add(`${point.x},${point.y}`);
                        octopus[point.x][point.y] = 0;
                        const neighborsCells = neighbors(point.x, point.y);
                        neighborsCells.forEach((cells) => {
                            queue.push(cells);
                        })
                    }
                }
                return rowFlashes;
            }, 0)
            return subFlashes + rowFlashes;
        }, 0);
        flashes += subFlashes;
        // console.log({
        //     i: i,
        //     octopus
        // })
    }
    console.log({flashes})
}

main();

// const ne = neighbors(2,2);
// console.log({ne});
