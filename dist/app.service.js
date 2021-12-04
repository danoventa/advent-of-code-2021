"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    getDay3Part1() {
        let count = 0;
        let cursor;
        for (let line of (0, utils_1.readFileByLine)('/inputs/day3Input1.txt', 'text')) {
            if (cursor) {
                const binaryLineList = line.split('');
                cursor = cursor.map((val, index) => val + parseInt(binaryLineList[index]));
            }
            else {
                cursor = line.split('').map(val => parseInt(val));
            }
            count += 1;
        }
        const binGamma = cursor.map((val) => Math.round(val / count).toString()).join('');
        const gammaVal = parseInt(binGamma, 2);
        const epsilonVal = parseInt(binGamma.split('').map(val => val ^ 1).join(''), 2);
        return gammaVal * epsilonVal;
    }
    getDay3Part2() {
        let cursor;
        let count = 0;
        let lineTracker = [];
        for (let line of (0, utils_1.readFileByLine)('/inputs/day3Input1.txt', 'text')) {
            if (cursor) {
                const binaryLineList = line.split('');
                lineTracker.push(binaryLineList.map(val => parseInt(val)));
                cursor[0] = cursor[0] + parseInt(binaryLineList[0]);
            }
            else {
                cursor = line.split('').map(val => parseInt(val));
                lineTracker.push(cursor);
            }
            count += 1;
        }
        const firstBlood = Math.round(cursor[0] / count);
        for (let i = 0; i < lineTracker.length; i++) {
            if (lineTracker[i][0] !== firstBlood) {
                lineTracker.splice(i, 1);
            }
        }
        let stillLooking = true;
        let iter = 1;
        let maxLength = lineTracker[0].length;
        while (stillLooking) {
            count = 0;
            let counter = 0;
            for (let line of lineTracker) {
                counter += line[iter];
                count += 1;
            }
            let blood = counter / count;
            for (let i = 0; i < lineTracker.length; i++) {
                if (lineTracker[i][iter] !== blood) {
                    lineTracker.splice(i, 1);
                }
                if (lineTracker.length === 1) {
                    stillLooking = false;
                }
            }
            iter++;
            if (iter >= maxLength) {
                stillLooking = false;
            }
        }
        const oxyLine = lineTracker[0].join('');
        const oxy = parseInt(oxyLine, 2);
        const co2 = parseInt(lineTracker[0].map((letter) => letter ^ 1).join(''), 2);
        return oxy * co2;
    }
    getDay2Part1() {
        const ans = {
            horizontal: 0,
            vertical: 0,
        };
        for (let line of (0, utils_1.readFileByLine)('/inputs/day2Input1.txt', 'text')) {
            (0, utils_1.calculateCoordinates)(ans, (0, utils_1.translateCoordinatesFromLine)(line));
        }
        return ans.horizontal * ans.vertical;
    }
    getDay2Part2() {
        const ans = {
            horizontal: 0,
            vertical: 0,
            aim: 0
        };
        for (let line of (0, utils_1.readFileByLine)('/inputs/day2Input1.txt', 'text')) {
            (0, utils_1.calculateAim)(ans, (0, utils_1.translateCoordinatesFromLine)(line));
        }
        return ans.horizontal * ans.vertical;
    }
    getDay1Part1() {
        let last;
        const countIncrementer = (0, utils_1.countIncrementsCurry)();
        let ans;
        for (let line of (0, utils_1.readFileByLine)('/inputs/day1Input1.txt', 'int')) {
            ans = countIncrementer((0, utils_1.captureIncrement)(line, last));
            last = line;
        }
        return ans;
    }
    getDay1Part2() {
        let lastSum;
        let ans;
        const captureIncrementerr = (0, utils_1.countIncrementsCurry)();
        for (let window of (0, utils_1.readFileByWindow)('/inputs/day1Input1.txt', 'int', 3)) {
            const currentSum = (0, utils_1.sumArray)(window);
            ans = captureIncrementerr((0, utils_1.captureIncrement)(currentSum, lastSum));
            lastSum = currentSum;
        }
        return ans;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map