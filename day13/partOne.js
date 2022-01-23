const {input} = require('./input');

const tempInput = input.split('\n\n');

const dots = tempInput[0].split('\n').map((dot) => dot.split(',').map(Number));
const flodInstruction = tempInput[1].split('\n')[0].split(' ')[2].split('=');

function PartOne(){
    if(flodInstruction[0] === 'y'){
        const divider = parseInt(flodInstruction[1]);
        const normalPart = dots.filter((dot) => dot[1] < divider);
        const flodPart = dots.filter((dot) => dot[1] > divider);
        const afterFloded = flodPart.map((dot) => {
            const newY = divider - (dot[1] - divider);
            return [dot[0], newY]
        })
        const flodedFinal = new Set([...normalPart.map(dot => `${dot[0]},${dot[1]}`), ...afterFloded.map(dot => `${dot[0]},${dot[1]}`)]);
        console.log({flodedFinal: flodedFinal.size})
    }else if(flodInstruction[0] === 'x'){
        const divider = parseInt(flodInstruction[1]);
        const normalPart = dots.filter((dot) => dot[0] < divider);
        const flodPart = dots.filter((dot) => dot[0] > divider);
        const afterFloded = flodPart.map((dot) => {
            const newX = divider - (dot[0] - divider);
            return [newX, dot[1]]
        })
        const flodedFinal = new Set([...normalPart.map(dot => `${dot[0]},${dot[1]}`), ...afterFloded.map(dot => `${dot[0]},${dot[1]}`)]);
        console.log({flodedFinal: flodedFinal.size})
    }
}

PartOne();
