
const {input} = require('./input');

const heightMap = input.split('\n').map((row) => row.split("").map(Number));
const mapLength = heightMap.length;
const subMapLength = heightMap[0].length;

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

function noWay(directions){
    const trueValue = Object.values(directions).filter(direction => direction);
    if(trueValue.length === 0){
        return true;
    }
    return false;
}

function main(){
    const lowPoints = findLowPoints();
    const basins = lowPoints.reduce((basins, point, index) => {
        let directions = {
            "top": true,
            "right": true,
            "bottom": true,
            "left": true,
            "topleft": true,
            "topright": true,
            "bottomleft": true,
            "bottomright": true
        }
        let i = 1;
        basins[index]++;
        while(!noWay(directions)){
            directions.top = directions.top === false ? false : {x: point.x + i, y: point.y}
            directions.bottom = directions.bottom === false ? false : {x: point.x - i, y: point.y}
            directions.left = directions.left === false ? false : {x: point.x, y: point.y - i}
            directions.right = directions.right === false ? false : {x: point.x, y: point.y + i}
            directions.topleft = directions.topleft === false ? false : {x: point.x + i, y: point.y - i}
            directions.topright = directions.topright === false ? false : {x: point.x + i, y: point.y + i}
            directions.bottomleft = directions.bottomleft === false ? false: {x: point.x - i, y: point.y - i}
            directions.bottomright = directions.bottomright === false ? false: {x: point.x - i, y: point.y + i}
            if(!directions.top || directions.top.x >= mapLength || heightMap[directions.top.x][directions.top.y] === 9){
                directions.top = false;
            }
            else if( directions.top && directions.top.x < mapLength && heightMap[directions.top.x][directions.top.y] !== 9){
                basins[index]++;
            }
            if(!directions.bottom || directions.bottom.x < 0 || heightMap[directions.bottom.x][directions.bottom.y] === 9){
                directions.bottom = false;
            }
            else if(directions.bottom  && directions.bottom.x >= 0 && heightMap[directions.bottom.x][directions.bottom.y] !== 9){
                basins[index]++;
            }
            if(!directions.left || directions.left.y < 0 || heightMap[directions.left.x][directions.left.y] === 9){
                directions.left = false;
            }
            else if( directions.left && directions.left.y >= 0 && heightMap[directions.left.x][directions.left.y] !== 9){
                basins[index]++;
            }
            if(!directions.right || directions.right.y >= subMapLength || heightMap[directions.right.x][directions.right.y] === 9){
                directions.right = false;
            }
            else if(directions.right && directions.right.y > subMapLength && heightMap[directions.right.x][directions.right.y] !== 9){
                basins[index]++;
            }
            if(!directions.topleft || directions.topleft.x >= mapLength
                || directions.topleft.y < 0
                || heightMap[directions.topleft.x][directions.topleft.y] === 9
            ){
                directions.topleft = false;
            }
            else if(directions.topleft && directions.topleft.x < mapLength
                && directions.topleft.y >= 0
                && heightMap[directions.topleft.x][directions.topleft.y] !== 9
            ){
                basins[index]++;
            }
            if( !directions.topright || directions.topright.x >= mapLength
                || directions.topright.y > subMapLength
                || heightMap[directions.topright.x][directions.topright.y] === 9
            ){
                directions.topright = false;
            }
            else if(
                directions.topright &&
                directions.topright.x < mapLength
                && directions.topright.y < subMapLength
                && heightMap[directions.topright.x][directions.topright.y] !== 9
            ){
                basins[index]++;
            }
            if(
                !directions.bottomleft ||
                directions.bottomleft.x < 0
                || directions.bottomleft.y < 0
                || heightMap[directions.bottomleft.x][directions.bottomleft.y] === 9
            ){
                directions.bottomleft = false;
            }
            else if(
                directions.bottomleft &&
                directions.bottomleft.x >= 0
                && directions.bottomleft.y >= 0
                && heightMap[directions.bottomleft.x][directions.bottomleft.y] !== 9
            ){
                basins[index]++;
            }
            if(
                !directions.bottomright ||
                directions.bottomright.x < 0
                || directions.bottomright.y > subMapLength
                || heightMap[directions.bottomright.x][directions.bottomright.y] === 9
            ){
                directions.bottomright = false;
            }
            else if(
                directions.bottomright &&
                directions.bottomright.x >= 0
                && directions.bottomright.y < subMapLength
                && heightMap[directions.bottomright.x][directions.bottomright.y] !== 9
            ){
                basins[index]++;
            }
            i++;
        }
        console.log({
            finsihed: point,
            basins
        })
        return basins
    }, new Array(lowPoints.length).fill(0))
}

main();
