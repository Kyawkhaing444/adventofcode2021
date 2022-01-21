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


    const finished = [];
    const paths = [['start']];

    while(paths.length > 0){
        let to_add = [];
        for(let i = 0; i < paths.length; i++){
            const path = paths[i];
            const tail = path[path.length - 1];
            if(tail === 'end'){
                finished.push(path);
                paths.splice(i, 1);
                i--;
                continue;
            }
            let deadEnd = true;
            if(graph.get(tail)){
                graph.get(tail).forEach((cave) => {
                    if(cave === cave.toLowerCase() && path.includes(cave)){
                        return;
                    }
                    if(deadEnd){
                        deadEnd = false;
                        path.push(cave);
                    }else{
                        const newPath = path.slice(0, -1);
                        newPath.push(cave);
                        to_add.push(newPath);
                    }
                })
            }
            if(deadEnd){
                paths.splice(i, 1);
                i--;
            }
        }
        paths.push(...to_add);
    }

    console.log({
        finished: finished.length
    })
}

partOne();
