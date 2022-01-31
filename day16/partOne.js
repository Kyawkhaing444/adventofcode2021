const { input } = require("./input");

function HextoBin(hexInput){
    return hexInput.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

function BintoDecimal(binary){
    return parseInt(binary , 2);
}

const hex = HextoBin(input);

function subPacketCal(packet){
    const version = BintoDecimal(packet.substring(0, 3));
    // const t = packet.substring(3, 6);
    const remainTemp = packet.substring(6);
    let temp = remainTemp.substring(0,5);
    let remain = remainTemp.substring(5);
    let zeroCount = 0;
    while(temp.charAt(0) !== '0' || zeroCount === 0){
        // console.log({b: temp.charAt(0) !== '0' || zeroCount === 0, va: temp.charAt(0)});
        temp = remain.substring(0, 5);
        remain = remainTemp.substring(5);
        if(temp.charAt(0) === '0'){
            zeroCount++;
        }
    }
    return {
        version,
        remain
    }
}

function zeroOperator(){
    let remainPart = hex.substring(7);
    const totalLength = BintoDecimal(remainPart.substring(0, 15));
    let result = 0;
    remainPart = remainPart.substring(15);
    const remainLength = remainPart.length - totalLength;

    while(remainPart.length > remainLength){
        const { version, remain } = subPacketCal(remainPart);
        // console.log({
        //     remainPart
        // })
        remainPart = remain;
        result += version
    }

    return result;
}

function oneOperator(){
    let remainPart = hex.substring(7);
    const totalPacket = BintoDecimal(remainPart.substring(0, 11));
    let result = 0;
    remainPart = remainPart.substring(11);
    let packetCount = 0;

    while(packetCount < totalPacket){
        const { version, remain } = subPacketCal(remainPart);
        remainPart = remain;
        result += version
        packetCount++;
    }

    return result;
}

function PartOne(){
    const v = hex.substring(0,3);
    // const t = hex.substring(3, 6);
    const tl = hex.charAt(7);
    let result = parseInt(BintoDecimal(v));
    if(tl === '0'){
        result += zeroOperator();
    }else if(tl === '1'){
        result += oneOperator();
    }

    console.log({
        result
    })
}

PartOne()
