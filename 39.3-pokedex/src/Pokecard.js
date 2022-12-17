import React from 'react';
import './Pokecard.css';

function Pokecard({id, name, type, experience}) {
    let imgSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (<div className='Pokecard'>
        <div className='Pokecard-title'>{name}</div>
        <img className='Pokecard-image' src={imgSource} alt={name}/>
        <div className='Pokecard-data'>Type: {type}</div>
        <div className='Pokecard-data'>EXP: {experience}</div>
    </div>
    );
}

export default Pokecard;