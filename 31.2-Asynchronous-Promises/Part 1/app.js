let baseURL = "http://numbersapi.com";

// 1st
$.getJSON(`${baseURL}/17?json`).then(data => {
  console.log(data.text);
})

// 2nd
$.getJSON(`${baseURL}/7,17,21?json`).then(data => {
  console.log(data);
})

// 3rd
Promise.all(
  Array.from({length: 4}, () => {
    return $.getJSON(`${baseURL}/17?json`);
  })
).then(info => {info.forEach(data => $("body").append(`<p>${data.text}</p>`))})
