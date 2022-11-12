let baseURL = "http://numbersapi.com";

// 1st
async function first() {
    let data = await $.getJSON(`http://numbersapi.com/17?json`);
    console.log(data);
  }
first();

// 2nd
async function second() {
  let data = await $.getJSON(`http://numbersapi.com/7,17,21?json`);
  console.log(data);
}
second();

// 3rd

async function third() {
    for (i=0;i<4;i++) {
        let data = await $.getJSON(`http://numbersapi.com/7?json`);
        $('body').append(`<p>${data.text}</p>`);
    }
}

third();
