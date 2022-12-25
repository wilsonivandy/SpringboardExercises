function findRotationCount(arr) {
    let left = 0;
    let right = arr.length - 1;

    if (arr[left] < arr[right]) return 0;

    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        let midVal = arr[mid];

        if (arr[mid] > arr[mid+1]) return mid+1;
        if (arr[mid] < arr[mid-1]) return mid;
        if (arr[mid])
        if (!(midVal < arr[right])) {
            left = mid;
        } else {
            if (!(arr[left] < midVal)) {
                right = mid;
            }
        }
    }
}

module.exports = findRotationCount
