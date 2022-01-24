const {input} = require("./input");

let [template, pairInsert] = input.split("\n\n");

pairInsert = pairInsert.split("\n").map((pair) => pair.split(" -> "));

const mapPairInsert = new Map(pairInsert);

function PartOne(){
    let resultTemplate = template;
    for(let i = 0; i < 10; i++){
        let insertingMap = new Map();
        for(let j = 0; j < resultTemplate.length - 1 ; j++){
            const pair = resultTemplate[j]+resultTemplate[j+1];
            if(mapPairInsert.has(pair)){
                insertingMap.set(j+1, mapPairInsert.get(pair));
            }
        }
        let jump = 0;
        for(let [key, value] of insertingMap){
            key = key + jump;
            const firstPart = resultTemplate.slice(0, key);
            const secondPart = resultTemplate.slice(key);
            resultTemplate = firstPart + value + secondPart;
            jump++;
        }
    }
    const countMap = new Map();
    for(let cha of resultTemplate){
        if(!countMap.has(cha)){
            countMap.set(cha, 0);
        }
        const count = countMap.get(cha) + 1;
        countMap.set(cha, count)
    }

    const sortedMap = [...countMap].sort((a, b) => b[1] - a[1]);

    console.log({
        result: sortedMap[0][1] - sortedMap[sortedMap.length-1][1]
    })

}

PartOne();
