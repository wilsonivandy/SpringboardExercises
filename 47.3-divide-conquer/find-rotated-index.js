function findRotatedIndex(arr, target) {
    let pivot = findPivot(arr);
    let minValue = arr[pivot];
    let lastVal = arr[arr.length - 1];

    if ((target >= minValue) && (target <= lastVal)) {
        return binarySearch(arr, target, pivot, arr.length - 1);
    } else {
        return binarySearch(arr, target, 0, pivot - 1);
    }
}

function findPivot(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right)/2)
        let midVal = arr[mid];

        if (arr[mid] > arr[mid+1]) return mid+1;
        if (arr[mid] < arr[mid-1]) return mid;
        if (!(midVal < arr[right])) {
            left = mid;
        } else {
            if (!(arr[left] < midVal)) {
                right = mid;
            }
        }
    }
}

function binarySearch(arr, target, start, end) {
    let left = start;
    let right = end;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        let midVal = arr[mid];

        if (midVal < target) {
            left = mid + 1;
        } else if (midVal > target) {
            right = mid - 1;
        } else {
            return mid;
        }
    }

    return -1;
}

module.exports = findRotatedIndex