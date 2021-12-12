import { ConsoleLogger } from "@nestjs/common";
import { readFileByLine, throttle } from "./utils"

interface Cave {
    adjacentCaves: string[];
    isSmallCave: boolean;
    name: string;

}

interface CaveSystem {
    [sourcePath: string]: Cave;
}
const buildCaveSystem = (srcFile: string): CaveSystem => {
    let caveMap: CaveSystem = {};
    for(let line of readFileByLine(`/inputs/${srcFile}`, 'txt')){
        const [source, destination] = (line as string)
            .split('-')
            .reduce((path, cave): string[] => 
                cave === 'start' || path.includes('end') 
                    ? [cave, ...path] 
                    : [...path, cave]
            ,[] as string[]);

        // Forward map paths
        if(caveMap[source]){
            caveMap[source].adjacentCaves.push(destination);
        } else {
            caveMap = {
                ...caveMap,
                [source]: {
                    adjacentCaves: [destination],
                    isSmallCave: source !== "start" ? source === source.toLowerCase() : false,
                    name: source
                },
            }
        }

        // Reverse Map Paths
        if(source !== 'start'){
            if(caveMap[destination]){
                caveMap[destination].adjacentCaves.push(source);
            } else {
                caveMap = {
                    ...caveMap,
                    [destination]: {
                        adjacentCaves: [source],
                        isSmallCave: destination === destination.toLowerCase(),
                        name: destination
                    },
                }
            }
        }
    }
    caveMap = {
        ...caveMap,
        'end': {
            adjacentCaves: [],
            isSmallCave: false,
            name: 'end',
        }
    }
    return caveMap;
}

const countPossiblePaths = (currentCave: Cave, caveMap: CaveSystem, visited: Set<string> = new Set()): number => {
    if(currentCave.name === 'end') return 1;
    if(visited.has(currentCave.name) && currentCave.isSmallCave) return 0;
    visited.add(currentCave.name);

    let possiblePaths = 0;
    for(let adjacentCave of currentCave.adjacentCaves){
        possiblePaths += countPossiblePaths(caveMap[adjacentCave], caveMap, new Set(visited));
    }
    return possiblePaths;
}

const solveForPart1 = (srcFile: string): number => {
    const caveMap: CaveSystem = buildCaveSystem(srcFile);
    const possiblePaths: number = countPossiblePaths(caveMap['start'], caveMap);
    return possiblePaths;
}

const countPossiblePaths2 = (currentCave: Cave, caveMap: CaveSystem, visited: Set<string> = new Set(), smallCaveVisited: boolean = false): number => {
    if(currentCave.name === 'end') return 1;
    if(visited.has(currentCave.name) && currentCave.isSmallCave) {
        if(smallCaveVisited) return 0;
        smallCaveVisited = true;
    }
    visited.add(currentCave.name);

    let possiblePaths = 0;
    for(let adjacentCave of currentCave.adjacentCaves){
        possiblePaths += countPossiblePaths2(caveMap[adjacentCave], caveMap, new Set(visited), smallCaveVisited);
    }
    return possiblePaths;
}

const solveForPart2 = (srcFile: string): number => {
    const caveMap: CaveSystem = buildCaveSystem(srcFile);
    return countPossiblePaths2(caveMap['start'], caveMap);
}

describe.skip("Day 12 part 1", () => {
    it('Test out Day 12 part 1 Sample 1', () => {
        expect(solveForPart1('day12sample1.txt')).toBe(10);
    })

    it('Test out Day 12 part 1 Sample 2', () => {
        expect(solveForPart1('day12sample2.txt')).toBe(19);
    })

    it('Test out Day 12 part 1 Sample 3', () => {
        expect(solveForPart1('day12sample3.txt')).toBe(226);
    })
    it('Test out Day 12 part 1 Input', () => {
        console.log(solveForPart1('day12input1.txt'));
    })
})

describe.only("Day 12 part 2", () => {
    it('Test out Day 12 part 2 Sample 1', () => {
        expect(solveForPart2('day12sample1.txt')).toBe(36);
    })

    it('Test out Day 12 part 2 Sample 2', () => {
        expect(solveForPart2('day12sample2.txt')).toBe(103);
    })

    it('Test out Day 12 part 2 Sample 3', () => {
        expect(solveForPart2('day12sample3.txt')).toBe(3509);
    })
    it('Test out Day 12 part 2 Input', () => {
        console.log(solveForPart2('day12input1.txt'));
    })
})
