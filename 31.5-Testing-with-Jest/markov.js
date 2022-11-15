/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let words = this.words;
    let taken = [];
    let chain = new Map();
    for (let i=0; i<words.length; i++){
      let word = words[i];
      if (taken.includes(word)) {
        let prev = chain.get(word);
        prev.push(words[i+1]);
        chain.set(word, prev)
      } else {
        chain.set(word, [words[i+1]])
      }
      taken.push(word);
    }
    this.chain = chain;
    this.makeText();
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let word = null;
    let rand;
    while (word == null) {
      rand = Math.floor(Math.random() * this.words.length);
      word = this.words[rand];
    }
    let text = `${word}`;
    let i=0;
    while (i<numWords-1) {
      let wordList = this.chain.get(word);
      if (wordList != null) {
        rand = Math.floor(Math.random() * wordList.length)
        let addWord = wordList[rand];
        text = text.concat(" ", addWord);
        word = addWord;
        i++;
      } else {
        i = numWords;
      }
    }
    console.log(text);
  }
}


module.exports = {
  MarkovMachine
}