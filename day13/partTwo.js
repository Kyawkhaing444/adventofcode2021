
const {input} = require('./input');

const tempInput = input.split('\n\n');

let dots = tempInput[0].split('\n').map((dot) => dot.split(',').map(Number));
const flodInstructions = tempInput[1].split('\n').map((flodIn) => flodIn.split(' ')[2].split('='));

function FlodingProcess({ label, value}){
    if(label === 'y'){
        const divider = parseInt(value);
        const normalPart = dots.filter((dot) => dot[1] < divider);
        const flodPart = dots.filter((dot) => dot[1] > divider);
        const afterFloded = flodPart.map((dot) => {
            const newY = divider - (dot[1] - divider);
            return [dot[0], newY]
        })
        const flodedFinal = new Set([...normalPart.map(dot => `${dot[0]},${dot[1]}`), ...afterFloded.map(dot => `${dot[0]},${dot[1]}`)]);
        dots = [...flodedFinal].map((pair) => pair.split(',').map(Number));
    }else if(label === 'x'){
        const divider = parseInt(value);
        const normalPart = dots.filter((dot) => dot[0] < divider);
        const flodPart = dots.filter((dot) => dot[0] > divider);
        const afterFloded = flodPart.map((dot) => {
            const newX = divider - (dot[0] - divider);
            return [newX, dot[1]]
        })
        const flodedFinal = new Set([...normalPart.map(dot => `${dot[0]},${dot[1]}`), ...afterFloded.map(dot => `${dot[0]},${dot[1]}`)]);
        dots = [...flodedFinal].map((pair) => pair.split(',').map(Number));
    }
}

function printGrid(){
    let maxX = 0;
    let maxY = 0;
    dots.forEach((dot) => {
        if(dot[0] > maxX){
            maxX = dot[0];
        }
        if(dot[1] > maxY){
            maxY = dot[1]
        }
    })

    const dotSets = new Set([...dots.map(dot => `${dot[0]},${dot[1]}`)]);

    for(let i = 0; i < maxY+1; i++){
        for(let j = 0; j < maxX+1; j++){
            if(dotSets.has(`${j},${i}`)){
                process.stdout.write('#')
            }else{
                process.stdout.write(' ')
            }
        }
        process.stdout.write('\n')
    }
}


for(let instruction of flodInstructions){
    FlodingProcess({label: instruction[0], value: instruction[1]});
}

printGrid();
