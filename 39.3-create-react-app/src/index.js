import React from 'react';
import ReactDOM from 'react-dom';
import fruits from "./foods";
import {choice, remove} from "./helpers";


let fruit = choice(fruits);
let fruitsLeft = remove(fruits, fruit);

console.log(`I'd like one ${fruit}, please`);
console.log(`Here you go: ${fruit}`);
console.log(`Delicious! May I have another?`);
console.log(`Im sorry, were all out. We have ${fruitsLeft} left`);

// ReactDOM.render(<App />, document.getElementById('root'));

