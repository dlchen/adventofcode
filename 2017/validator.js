module.exports = (func, validations) => {

    validations.forEach((expectedResult, testInput) => {

        const result = func(testInput);
        try {
            console.assert(result === expectedResult);
        } catch (error) {
            console.error(
                `expected ${func.name}(${testInput})`,
                `to equal ${expectedResult}, not ${result}`
            );
        }
    });
};
