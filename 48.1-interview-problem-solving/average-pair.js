// add whatever parameters you deem necessary
function averagePair(arr, target) {
    if (arr.length === 0) return false;
    let arrMap = {};
    for (let i=0; i < arr.length; i++) {
        arrMap[arr[i]] = (arrMap[arr[i]] += 1) || 1;
    }
    
    for (key in Object.keys(arrMap)) {
        let guessPair = 2 * target - key;
        if (guessPair in arrMap) {
            if (key !== guessPair) {
                return true;
            }
            if (key === guessPair && arrMap[guessPair] > 1) {
                return true;
            }
        }
    }
    return false;
}

module.exports = averagePair;
