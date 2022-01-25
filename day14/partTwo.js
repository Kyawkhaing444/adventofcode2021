
const {input} = require('./input');

let [template, pairInsert] = input.split("\n\n");
pairInsert = pairInsert.split("\n").map((pair) => pair.split(" -> "));
const mapPairInsert = new Map(pairInsert);

function partTwo(){
    let pairCountMap = new Map();
    for(let i = 0; i < template.length - 1; i++){
        const pair = `${template[i]}${template[i+1]}`;
        if(!pairCountMap.has(pair)){
            pairCountMap.set(pair, 0);
        }
        pairCountMap.set(pair, pairCountMap.get(pair) + 1);
    }
    for(let i = 0; i < 40; i++){
        const newPair = new Map();
        for(let [pair, count] of pairCountMap){
            if(mapPairInsert.has(pair)){
                const firstPair = pair[0] + mapPairInsert.get(pair);
                const secondPair = mapPairInsert.get(pair) + pair[1];

                newPair.set(firstPair, count + (newPair.get(firstPair) || 0));
			    newPair.set(secondPair, count + (newPair.get(secondPair) || 0));
            }
        }
        pairCountMap = newPair;
    }
    const chaCount = new Map();
    for(let [pair, count] of pairCountMap){
        const Fcha = pair.charAt(0);
        const Scha = pair.charAt(1);

        chaCount.set(Fcha, count + (chaCount.get(Fcha) || 0));
		chaCount.set(Scha, count + (chaCount.get(Scha) || 0));
    }

    chaCount.set(template[0], chaCount.get(template[0]) + 1);
    chaCount.set(template[template.length - 1], chaCount.get(template[template.length - 1]) + 1);

    const sortedMap = [...chaCount].map(([key, count]) => [key, count / 2]).sort((a, b) => b[1] - a[1]);

    console.log({
        sortedMap,
        result: sortedMap[0][1] - sortedMap[sortedMap.length-1][1]
    })
}

partTwo();
