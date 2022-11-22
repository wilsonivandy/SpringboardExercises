/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    let mm =  new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error("Cant read file");
            process.exit(2);
        } else {
            generateText(data);
        }
    })
}

async function getTextURL(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error('Cannot read URL')
        process.exit(2);
    }
    generateText(resp.data);
}

method = process.argv[2];
path = process.argv[3];

if (method == "file") {
    makeText(path);
} else if (method == "url") {
    getTextURL(path);
} else {
    console.error('Unknown method')
    process.exit(2);
}

