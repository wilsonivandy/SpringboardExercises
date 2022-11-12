$(function() {
    async function first() {
        let shuffledDeck = await $.getJSON(`https://deckofcardsapi.com/api/deck/new/draw/`);
        let { suit, value } = shuffledDeck.cards[0];
        console.log(`${value} of ${suit}`);
    }
    
    async function second() {
        let shuffledDeck = await $.getJSON(`https://deckofcardsapi.com/api/deck/new/draw/`);
        let deckId = shuffledDeck.deck_id;
        let randomCard = await $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
        [shuffledDeck, randomCard].forEach(card => {
          let { suit, value } = card.cards[0];
          console.log(`${value} of ${suit}`);
        });
      }
    
    async function game(){
        let button = $('button');
        let cardArea = $('#cardArea');
        let shuffledDeck = await $.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/`);
        button.on('click', async function(){
            let deckId = shuffledDeck.deck_id;
            let randomCard = await $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
            let cardImg = randomCard.cards[0].image;
            cardArea.append($('<img>', {src: cardImg}))
        })
    }
    game();
});
