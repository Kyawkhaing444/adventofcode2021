
const { input } = require('./input')

const chunks = input.split('\n');

const scoreMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const totalErrorScore = chunks.reduce((totalErrorScore, chunk) => {
    const stack = [];
    for(let cha of chunk){
        if(cha === '(' || cha === '[' || cha === '{' || cha === '<'){
            stack.push(cha);
        }
        else if(cha === ')'){
            if(stack.pop() !== '('){
                return totalErrorScore + scoreMap[cha];
            }
        }
        else if(cha === ']'){
            if(stack.pop() !== '['){
                return totalErrorScore + scoreMap[cha];
            }
        }
        else if(cha === '}'){
            if(stack.pop() !== '{'){
                return totalErrorScore + scoreMap[cha];
            }
        }
        else if(cha === '>'){
            if(stack.pop() !== '<'){
                return totalErrorScore + scoreMap[cha];
            }
        }
    }
    return totalErrorScore;
}, 0);

console.log(totalErrorScore);
