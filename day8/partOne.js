const { input } = require('./input')

const entrys = input.split('\n');

function partOne(){
  let countDigits = 0;
  entrys.forEach((entry) => {
    const [patterns, doutputs] = entry.split(" | ");
    const lengthMap = new Map();
    const pattern = patterns.split(" ");
    pattern.forEach((item)=> {
      if(item.length === 2 || item.length === 3 || item.length === 4 || item.length === 7){
        if(!lengthMap.has(item.length)){
          lengthMap.set(item.length, 0);
        }
        lengthMap.set(item.length, lengthMap.get(item.length)+1);
      }
    })
    const doutput = doutputs.split(" ");
    doutput.forEach((item) => {
      if(lengthMap.get(item.length) === 1){
        countDigits++;
      }
    })
  })
  return countDigits;
}

console.log({countDigits: partOne()});
