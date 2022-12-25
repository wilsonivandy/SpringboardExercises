function sortedFrequency(arr, target) {
    
    let first = getFirst(arr, target);
    let last = getLast(arr, target);
    
    if ((first !== -1) && (last !== -1)) {
        return last - first + 1;
    } else {
        return -1;
    }
}


function getFirst(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        let midVal = arr[mid];

        if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (arr[left] === target) {
        return left;
    } else {
        return -1;
    }
}

function getLast(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        let midVal = arr[mid];

        if (midVal > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if (arr[right] === target) {
        return right;
    } else {
        return -1;
    }
}


  module.exports = sortedFrequency