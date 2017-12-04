const fs = require('fs');
const path = require('path');
const validator = require('./validator');


const diffCalculator = (stringArr) => {

    let min = Infinity;
    let max = -Infinity;

    stringArr
        .map(str => Number(str))
        .forEach(num => {
            if (num < min) {
                min = num;
            }
            if (num > max) {
                max = num;
            }
        });

    return max - min;
};

const diffCalcValidations = new Map([
    [[9, 1, 3], 8],
    [[1, 9, 3], 8],
    [[1, 1], 0],
    [[5, 1, 9, 5], 8],
    [[7, 5, 3], 4],
    [[2, 4, 6, 8], 6]
])

validator(diffCalculator, diffCalcValidations);


const calcChecksum = (string) => {

    return string
        .split('\n')
        .map(row => row.split('\t'))
        .reduce((checksum, currRow, i, arr) => {

            checksum += diffCalculator(currRow);
            return checksum;
        }, 0);
};


fs.readFile(path.resolve(__dirname, './12-02-input'), 'utf8', (err, string) => {

    if (err) throw err;
    console.log(calcChecksum(string));
});
