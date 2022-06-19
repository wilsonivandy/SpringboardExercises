// code returns 8, and 1846
// code returns object with keys and values of 1846 and 1659
// code returns 'Your name is Alejandro and you like purple', 'Your name is Melissa and you like green', 'Your name is undefined and you like green'


// 'Maya', 'Marisa', 'Chi'
// "Raindrops on roses", "Whiskers on Kittens", ["Bright copper kettles", "warm woolen mittens", "brown apper packages tied up with strings"]
// [10, 30, 20]

// ES2015 Refactoring:
const obj = {
    numbers: {
        a: 1,
        b: 2
    }
};
let {numbers: {a, b}} = obj;


//ES2015 Array Swap
let arr = [1,2];
[arr[0], arr[1]] = [arr[1], arr[0]];


const raceResults = (first, second, third, ...rest) => ({first, second, third, ...rest});