
const { input } = require("./input");

function HextoBin(hexInput){
    return hexInput.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

const data = HextoBin(input);

function calculateValue(typeID, subPacketValues){
    if(typeID === 0){
        return subPacketValues.reduce((sum, value) => sum + value, 0);
    }
    if(typeID === 1){
        return subPacketValues.reduce((product, value) => product * value, 1);
    }
    if(typeID === 2){
        return Math.min(...subPacketValues);
    }
    if(typeID === 3){
        return Math.max(...subPacketValues);
    }
    if(typeID === 5){
        if(subPacketValues.length === 2){
            return Number(subPacketValues[0] > subPacketValues[1]);
        }
        return null;
    }
    if(typeID === 6){
        if(subPacketValues.length === 2){
            return Number(subPacketValues[0] < subPacketValues[1]);
        }
        return null;
    }
    if(typeID === 7){
        if(subPacketValues.length === 2){
            return Number(subPacketValues[0] === subPacketValues[1]);
        }
        return null;
    }
}

function parse(i, j = -1){
    if(i === j){
        return [null, null]
    }

    if(i > data.length - 4){
        return [null, null]
    }

    const version = parseInt(data.substring(i,i+3), 2);
    const typeID = parseInt(data.substring(i+3,i+6), 2);

    if(typeID === 4){
        let end = false;
        i += 6;
        let numStr = "";
        while(!end){
            if(data.charAt(i) === '0'){
                end = true;
            }
            numStr += data.substring(i+1, i+5);
            i += 5;
        }
        const val = parseInt(numStr, 2);
        return [val, i]
    }

    const subPacketValues = [];
    let nextStart = null;

    const lenID = data.charAt(i+6);

    if(lenID === '0'){
        const numBits = parseInt(data.substring(i+7, i+22), 2);
        let startIndex = i + 22;
        let endIndex = i + 22 + numBits;
        let previousIndex = null;
        while(startIndex !== null){
            previousIndex = startIndex;
            const [val, index] = parse(startIndex, endIndex);
            startIndex = index;
            if(val !== null){
                subPacketValues.push(val);
            }
        }
        nextStart = previousIndex;
    }else{
        let numPackets = parseInt(data.substring(i+7, i+18), 2);
        let startIndex = i + 18;
        while(numPackets > 0){
            const [val, index] = parse(startIndex, -1);
            numPackets -= 1;
            if(val !== null){
                subPacketValues.push(val);
            }
            startIndex = index
        }
        nextStart = startIndex
    }

    return [calculateValue(typeID, subPacketValues), nextStart]
}

const result = parse(0, -1)[0];

console.log({result})
