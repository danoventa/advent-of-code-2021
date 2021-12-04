export declare const calculateAim: (ans: any, change: any) => void;
export declare const calculateCoordinates: (ans: any, change: any) => void;
export declare const translateCoordinatesFromLine: (line: string) => {
    direction: string;
    amount: number;
};
export declare function readFileByLine(filePath: string, type: string): Generator<string | number, void, unknown>;
export declare function readFileByWindow(filePath: string, type: string, size: number): Generator<string[] | number[], void, unknown>;
export declare const captureIncrement: (line: number, last: number) => 0 | 1;
export declare const countIncrementsCurry: () => (increment: any) => number;
export declare const sumArray: (arr: number[]) => number;
