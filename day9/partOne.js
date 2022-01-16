const {input} = require('./input');

const heightMap = input.split('\n').map((row) => row.split("").map(Number));

function PartOne(){
    const mapLength = heightMap.length;
    const sumRiskLevel = heightMap.reduce((sumRiskLevel, map, globalIndex) => {
        const subRiskLevel = map.reduce((subRiskLevel, height, index) => {
            const top = globalIndex + 1;
            const bottom = globalIndex - 1;
            const left = index - 1;
            const right = index + 1;
            if(top < mapLength){
                if(height >= heightMap[top][index]){
                    return subRiskLevel;
                }
            }
            if(bottom >= 0){
                if(height >= heightMap[bottom][index]){
                    return subRiskLevel
                }
            }
            if(left >= 0){
                if(height >= heightMap[globalIndex][left]){
                    return subRiskLevel
                }
            }
            if(right < map.length){
                if(height >= heightMap[globalIndex][right]){
                    return subRiskLevel
                }
            }
            return subRiskLevel + height + 1;
        }, 0)
        return sumRiskLevel + subRiskLevel;
    }, 0);
    console.log({sumRiskLevel});
}

PartOne();
