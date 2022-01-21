const { input } = require('./input');

const caves = input.split("\n").map((path) => path.split('-'));

function partOne(){
    const graph = caves.reduce((graph, path) => {
        if(!graph.get(path[0])){
            graph.set(path[0], [])
        }
        graph.get(path[0]).push(path[1]);
        if(path[1] !== 'end' && path[0] !== 'start'){
            if(!graph.get(path[1])){
                graph.set(path[1], [])
            }
            graph.get(path[1]).push(path[0]);
        }
        return graph;
    }, new Map());

    console.log(graph);
    let pathCount = 0;
    const stack = [];
    let visitedForSmall = new Set();
    stack.push('start');
    while(stack.length > 0){
        const cave = stack.pop();
        if(cave === 'end'){
            pathCount++;
        }else{
            if(graph.get(cave)){
                graph.get(cave).forEach((nCave) => {
                    if(!visitedForSmall.has(nCave)){
                        stack.push(nCave);
                        if(nCave === nCave.toLowerCase() && nCave !== 'start' && nCave !== 'end'){
                            visitedForSmall.add(nCave);
                        }
                    }
                })
            }
        }
    }
    console.log({pathCount})
}

partOne();
