// returns a set of {1,2,3,4}

// returns "ref"

// has 2 key value pairs, one to true, and one to false

function hasDuplicate(arr) {
    return arr.length !== [...new Set(arr)].length
}

function vowelCount(str){
    const vowels = 'aeiou';
    let res = new Map();
    let filtered = Array.from(str).filter(s => vowels.includes(s));
    for (s of filtered) {
        if (res.has(s)) {
            res.set(s, res.get(s) + 1);
        } else {
            res.set(s, 1)
        }
    }
    return res;
}