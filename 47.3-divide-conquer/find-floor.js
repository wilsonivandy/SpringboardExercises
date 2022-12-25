function findFloor(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    if (target > arr[right]) return arr[right];

    while (left <= right) {
        let mid = Math.floor((left+right)/2);

        if ((arr[mid] >= target) && (arr[mid-1] <= target)) return arr[mid-1];
        if (arr[mid] < target) {
            left = mid + 1;
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else {
            console.log(mid);
            if ((mid < left) && (mid < right)) {
                return arr[mid]
            }
        }
    }

    return -1;
}

module.exports = findFloor