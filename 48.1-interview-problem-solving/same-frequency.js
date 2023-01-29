// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    let frequencyMap1 = createFrequencyObject(num1);
    let frequencyMap2 = createFrequencyObject(num2);
    for (let key in frequencyMap1) {
        if (!(key in frequencyMap2)) return false;
        if ((key in frequencyMap2) && frequencyMap1[key] !== frequencyMap2[key]) return false;
    }
    return true
}

function createFrequencyObject(num) {
    let strArr = num.toString().split("");
    let obj = {};
    for (let i=0; i < strArr.length; i++) {
        obj[strArr[i]] = (obj[strArr[i]] += 1) || 1;
    }
    return obj;
}

module.exports = sameFrequency;
