// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
    let result = {};
    for (let i=0; i < arr1.length; i++){
        let value;
        if (arr2[i] === undefined) {
            value = null;
        } else {
            value = arr2[i];
        }
        result[arr1[i]] = value;
    }
    return result;
}

module.exports = twoArrayObject;