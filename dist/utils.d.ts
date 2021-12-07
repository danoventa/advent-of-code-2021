export interface CloudCoordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface CloudCoordinatesReadout {
    cloudCoordinatesSet: CloudCoordinates[];
}
export interface CloudCoordinateCol {
    [colIndex: number]: number;
}
export interface CloudCoordinateTracking {
    [rowIndex: number]: CloudCoordinateCol;
}
export declare const countDangerZones: (trackedClouds: CloudCoordinateTracking) => number;
export declare const trackCloudCoordinates: (coord: CloudCoordinates, rows: CloudCoordinateTracking) => CloudCoordinateTracking;
export declare const generateCloudCoordinates: (instructions: string) => CloudCoordinates;
export interface BingoCard {
    rows: number[][];
}
export interface BingoGame {
    calls: number[];
    cards: BingoCard[];
}
interface BingoWinner {
    winningCard: BingoCard;
    winningCall: number;
}
export interface BingoWinners {
    winners: BingoWinner[];
}
export declare const calculateBingoSum: (card: BingoCard) => number;
export declare const checkCard: (call: number, card: BingoCard) => {
    card: {
        rows: number[][];
    };
    status: boolean;
};
export declare const generateBingoGame: () => BingoGame;
export declare function readBingos(filePath: string): Generator<string, void, unknown>;
export declare const calculateAim: (ans: any, change: any) => void;
export declare const calculateCoordinates: (ans: any, change: any) => void;
export declare const translateCoordinatesFromLine: (line: string) => {
    direction: string;
    amount: number;
};
export declare function readFileByLine(filePath: string, type: string): Generator<string | number, void, unknown>;
export declare function readFileByWindow(filePath: string, type: string, size: number): Generator<number[] | string[], void, unknown>;
export declare const captureIncrement: (line: number, last: number) => 0 | 1;
export declare const countIncrementsCurry: () => (increment: any) => number;
export declare const sumArray: (arr: number[]) => number;
export {};
