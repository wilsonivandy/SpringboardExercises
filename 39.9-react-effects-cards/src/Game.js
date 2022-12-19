import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from './Card';

function Game() {
    const timerId = useRef();
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);

    useEffect(() => {
        async function fetchDeck() {
            
            const deck = await axios.get(
                `https://deckofcardsapi.com/api/deck/new/shuffle/`);
            console.log(deck)
            setDeckId(deck.data.deck_id)
        }
        fetchDeck();
    }, []);

    useEffect(function setCounter() {
        async function addCard() {
            try {
                let newDraw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
                
                if (newDraw.data.remaining === 0) {
                    setAutoDraw(false);
                    throw new Error("No cards remaining")
                }
    
                let newCard = {id : newDraw.data.cards[0].code, image : newDraw.data.cards[0].image}
                setCards(cards => [...cards, newCard]);
            } catch(err) {
                alert(err);
            }
        }

        if (autoDraw && !timerId.current) {
            timerId.current = setInterval(async () => {
              await addCard();
            }, 1000);
        }
      
    
        return function cleanUpClearTimer() {
          console.log("Unmount ID", timerId.current);
          clearInterval(timerId.current);
          timerId.current = null;
        };
      }, [autoDraw, setAutoDraw, deckId]);

    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto);
    }


    return (
        <div>
            <button onClick={toggleAutoDraw}>{autoDraw ? "Stop" : "Keep"} drawing</button>
            {cards.map(card => (
                <Card
                    key={card.id}
                    image={card.image}
                />
            ))}
        </div>
    )
}

export default Game;