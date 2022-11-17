const { count } = require('console');
const express = require('express');
const ExpressError = require("./expressError")
const app = express()

app.get('/mean', function(request, response) {
    if (!request.query.nums) {
        throw new ExpressError('No input given.', 400)
      }
    let splitNums = request.query.nums.split(',');
    let numberNums = convertNums(splitNums);
    if (numberNums instanceof Error) {
        throw new ExpressError(numberNums.message)
    }

    let result = {
        operation: "mean",
        result: getMean(numberNums)
    }
    return response.send(result);
  });

  app.get('/median', function(request, response) {
    if (!request.query.nums) {
        throw new ExpressError('No input given.', 400)
      }
    let splitNums = request.query.nums.split(',');
    let numberNums = convertNums(splitNums);
    if (numberNums instanceof Error) {
        throw new ExpressError(numberNums.message)
    }
    let result = {
        operation: "median",
        result: getMedian(numberNums)
    }
    return response.send(result);
  });

  app.get('/mode', function(request, response) {
    if (!request.query.nums) {
        throw new ExpressError('No input given.', 400)
      }
    let splitNums = request.query.nums.split(',');
    let numberNums = convertNums(splitNums);
    if (numberNums instanceof Error) {
        throw new ExpressError(numberNums.message)
    }
    let unique = [... new Set(numberNums)];
    let max = 0;
    let res = 0;
    for(let i=0; i<unique.length; i++) {
        let counter = 0
        for (num of numberNums) {
            if (unique[i] === num) {
                counter += 1;
            }
        }
        if (counter > max) {
            max = counter;
            res = unique[i];
        }
    }
    let result = {
        operation: "median",
        result: res,
    }
    return response.send(result);
  });
function getMean(numList) {
    let sum = 0;
    numList.forEach(function (el, index) {
        sum += el;
    })
    return sum/(numList.length);
}

function getMedian(numList) {
    numList.sort(function(a,b) {
        return a-b;
    })
    index = Math.floor(numList.length / 2);
    
    if ((numList.length % 2)) {
        return numList[index];
    } else {
        return (numList[index-1] + numList[index]) / 2
    }
}

function getMode(numList) {
    numList.sort(function(a,b) {
        return a-b;
    })
    index = Math.floor(numList.length / 2);
    
    if ((numList.length % 2)) {
        return numList[index];
    } else {
        return (numList[index-1] + numList[index]) / 2
    }
}

function convertNums(numList) {
    let result = [];
    for (let i=0; i<numList.length; i++) {
        if (isNaN(numList[i])) {
            return new Error(`${numList[i]} is not a number`)
        } else {
            result.push(Number(numList[i]));
        }
    }
    return result;
}


app.listen(3000, function () {
    console.log('App on  port 3000');
})