const fs = require('fs')
const path = require('path')
const validator = require('./validator')


const validations = new Map([
    [[5, 9, 2, 8], 4],
    [[9, 4, 7, 3], 3],
    [[3, 8, 6, 5], 2]
])

const findDivisibleQuotient = (numArr) => {

    let found = false;
    let quotient;

    numArr.forEach((num1, i) => {

        if (found) return;

        numArr.forEach((num2, j) => {

            if (i === j) return;

            if (num1 % num2 === 0) {
                quotient = Math.floor(num1 / num2);
                found = true;
                return;
            }
        })
    })

    return quotient;
}

validator(findDivisibleQuotient, validations)


const calcChecksum = (string) => {

    return string
        .split('\n')
        .map(row => row.split('\t'))
        .reduce((checksum, currRow) => {

            checksum += findDivisibleQuotient(currRow);
            return checksum;
        }, 0);
}


fs.readFile(path.resolve(__dirname, './day02-input'), 'utf8', (err, string) => {

    if (err) throw err;
    console.log(calcChecksum(string));
});
