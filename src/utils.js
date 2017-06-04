/**
 * Replaces underscore's _.difference()
 * https://jsperf.com/difference-between-two-arrays-with-native-javascript-or/8
 * Difference between two arrays with native javascript or underscore or jquery
*/

export const difference = (array1, array2) => {
    const result = [];
    for (let i = array1.length - 1; i >= 0; i--) {
        const key = array1[i];
        if (-1 === array2.indexOf(key)) {
            result.push(key);
        }
    }

    return result;
};