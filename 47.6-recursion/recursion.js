/** product: calculate the product of an array of numbers. */

const { type } = require("express/lib/response");

function product(nums) {
  if (nums.length === 0) return 1;
  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, long=0, i=0) {
  if (words.length === i) return long;
  if (words[i].length > long) long=words[i].length;
  return longest(words, long, i + 1);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, res="", i=0) {
  if (str.length === i) return res;
  if (i % 2 === 0) res += str[i];
  return everyOther(str, res, i+1);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length === 1) return true;
  if (str[0] === str[str.length - 1]) {
    str = str.slice(0,-1);
    str = str.slice(0, 1);
    return isPalindrome(str);
  } else {
    return false;
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i=0) {
  if (arr.length === i) return -1;
  if (arr[i] === val) {
    return i;
  } else {
    return findIndex(arr, val, i + 1);
  }

}

/** revString: return a copy of a string, but in reverse. */

function revString(str, res="", i=1) {
  if (str.length === i - 1) return res;
  res += str[str.length - i];
  return revString(str, res, i + 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, res=[]) {
  for (let key in obj) {
    if (typeof obj[key] === "string") res.push(obj[key]);
    if (typeof obj[key] === "object") res.push(...gatherStrings(obj[key]));
  }
  return res;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, i=0) {
  if (arr.length <= 2) {
    if (arr[0] === val) return 0 + i;
    if (arr[1] === val) return 1 + i;
    return -1;
  }
  
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right)/2);
  
  if (arr[mid] < val) {
    left = mid + 1;
  } else if (arr[mid] > val) {
    right = mid - 1;
  } else {
    return mid + i*2;
  }

  return binarySearch(arr.slice(left, right + 1), val, i+2);

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
