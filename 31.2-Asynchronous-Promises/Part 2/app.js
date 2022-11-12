$(function() {
    $.getJSON(`https://deckofcardsapi.com/api/deck/new/draw/`).then(data => {
        let {suit, value} = data.cards[0];
        console.log(`${value} of ${suit}`)
    })

    let firstCard = 0;
    $.getJSON(`https://deckofcardsapi.com/api/deck/new/draw/`).then(data => {
        firstCard = data.cards[0]
        let deckId = data.deck_id;
        return $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    }).then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(`${card.value} of ${card.suit}`);
        })
    })

    let button = $('button');
    let cardArea = $('#cardArea');
    let deckId = 0;

    $.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/`).then(data => {
        deckId = data.deck_id;
        $btn.show();
    })
    button.on('click', async function(){
        $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`).then(data => {
            let cardImg = data.cards[0].image;
            cardArea.append($('<img>', {src: cardImg}))
        })
    })
    
});
