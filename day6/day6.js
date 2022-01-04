let rawInput = `3,5,3,1,4,4,5,5,2,1,4,3,5,1,3,5,3,2,4,3,5,3,1,1,2,1,4,5,3,1,4,5,4,3,3,4,3,1,1,2,2,4,1,1,4,3,4,4,2,4,3,1,5,1,2,3,2,4,4,1,1,1,3,3,5,1,4,5,5,2,5,3,3,1,1,2,3,3,3,1,4,1,5,1,5,3,3,1,5,3,4,3,1,4,1,1,1,2,1,2,3,2,2,4,3,5,5,4,5,3,1,4,4,2,4,4,5,1,5,3,3,5,5,4,4,1,3,2,3,1,2,4,5,3,3,5,4,1,1,5,2,5,1,5,5,4,1,1,1,1,5,3,3,4,4,2,2,1,5,1,1,1,4,4,2,2,2,2,2,5,5,2,4,4,4,1,2,5,4,5,2,5,4,3,1,1,5,4,5,3,2,3,4,1,4,1,1,3,5,1,2,5,1,1,1,5,1,1,4,2,3,4,1,3,3,2,3,1,1,4,4,3,2,1,2,1,4,2,5,4,2,5,3,2,3,3,4,1,3,5,5,1,3,4,5,1,1,3,1,2,1,1,1,1,5,1,1,2,1,4,5,2,1,5,4,2,2,5,5,1,5,1,2,1,5,2,4,3,2,3,1,1,1,2,3,1,4,3,1,2,3,2,1,3,3,2,1,2,5,2`

const input = rawInput.split(',').map(Number);

function PartOne(initialFishs, day){
  if(day >= 80){
    return initialFishs.length;
  }
  const newFishs = [...initialFishs];
  for(let i = 0; i < initialFishs.length; i++){
    if(initialFishs[i] === 0){
      newFishs[i] = 6;
      newFishs.push(8);
    }else{
      newFishs[i] = initialFishs[i] - 1;
    }
  }
  day++;
  return PartOne(newFishs, day);
}

function increseMap(hashMap, key, incresement){
  if(!hashMap.has(key)){
    hashMap.set(key, 0);
  }
  hashMap.set(key, hashMap.get(key) + incresement)
}

function toHashMap(fishs){
  const hashMap = new Map();
  for(let fish of fishs){
    increseMap(hashMap, fish, 1);
  }
  return hashMap;
}

function PartTwo(initialFishs){
  let FishTable = toHashMap(initialFishs);
  for(let i = 0; i < 256; i++) {
    const newFishTable = new Map();
    for(let [fish, count] of FishTable){
      if(fish === 0){
        increseMap(newFishTable, 6, count)
        increseMap(newFishTable, 8, count)
      }else if(fish > 0){
        increseMap(newFishTable, fish - 1, count)
      }
    }
    FishTable = newFishTable;
  }
  let fishCount = 0;
  for(let [fish, count] of FishTable){
    fishCount += count;
  }
  return fishCount
}

console.log(PartOne(input, 0));
console.log(PartTwo(input));
