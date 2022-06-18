const filterOutOdds = (...args) => args.filter(num => num % 2 === 0);

const findMin = (...args) => Math.min(...args);

const mergeObjects = (arg1, arg2) => ({...arg1, ...arg2});

const doubleAndReturnArgs = (arr, ...nums) => [...arr, ...nums.map(n => n * 2)];

function removeRandom(items) {
    let newArr = [...items];
    let item = newArr[Math.floor(Math.random()*newArr.length)]
    newArr.pop(item);
    return newArr;
}

function extend(array1, array2) {
    return [...array1, ...array2];
}

function addKeyVal(obj, key, val) {
    return {...obj, [key]: val};
}

function removeKey(obj, key) {
    let newObj = {...obj};
    delete newObj[key];
    return newObj;
}

function combine(obj1, obj2) {
    return {...obj1, ...obj2};
}

function update(obj, key, val){
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
}