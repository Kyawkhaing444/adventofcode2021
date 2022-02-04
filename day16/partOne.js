const { input } = require("./input");

function HextoBin(hexInput){
    return hexInput.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

const data = HextoBin(input);

function parse(packet, count= -1){
    if(packet === "" || parseInt(packet) === 0){
        return 0;
    }
    if(count === 0){
        return parse(packet, -1)
    }
    const version = parseInt(packet.substring(0,3), 2);
    const typeID = parseInt(packet.substring(3,6), 2);

    // check typeID is literal value
    if(typeID === 4){
        let i = 6;
        let end = false;
        while(!end){
            if(packet.charAt(i) === '0'){
                end = true;
            }
            i += 5;
        }
        return version + parse(packet.substring(i), count - 1);
    }

    const lengthID = packet.charAt(6);
    // check lengthID is operator
    if(lengthID === '0'){
        const numBits = parseInt(packet.substring(7, 22), 2);
        return version + parse(packet.substring(22, 22 + numBits), -1) + parse(packet.substring(22+numBits), count - 1);
    }else{
        const numPackets = parseInt(packet.substring(7, 18), 2);
        return version + parse(packet.substring(18), numPackets);
    }
}

const result = parse(data, -1);

console.log({
    result
})
