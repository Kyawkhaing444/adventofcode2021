

const { input } = require('./input')

const chunks = input.split('\n');

const scoreMap = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
}

const ScoreList = chunks.reduce((ScoreList, chunk) => {
    let stack = [];
    for(let cha of chunk){
        if(cha === '(' || cha === '[' || cha === '{' || cha === '<'){
            stack.push(cha);
        }
        else if(cha === ')'){
            if(stack.pop() !== '('){
                stack = []
                break;
            }
        }
        else if(cha === ']'){
            if(stack.pop() !== '['){
                stack = []
                break;
            }
        }
        else if(cha === '}'){
            if(stack.pop() !== '{'){
                stack = []
                break;
            }
        }
        else if(cha === '>'){
            if(stack.pop() !== '<'){
                stack = []
                break;
            }
        }
    }

    if(stack.length > 0){
        let score = 0;
        const length = stack.length
        for(let i = 0; i < length; i++){
            score = (score * 5) + scoreMap[stack.pop()];
        }
        ScoreList.push(score);
    }


    return ScoreList;
}, []);

ScoreList.sort((a, b) => b - a);

console.log({
    result: ScoreList[Math.floor(ScoreList.length/2)]
})
