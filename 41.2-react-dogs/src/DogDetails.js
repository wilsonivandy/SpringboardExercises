import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import './DogDetails.css'

function DogDetails(props) {

    const {name} = useParams();
    const dogs = props.dogs;
    let currDog;
    
    if (name) {
        currDog = dogs.find(
            dog => dog.name.toLowerCase() === name.toLowerCase()
        );
    }

    return (
    <div className='dogDetail'>
        <div className='dogTitle'>{currDog.name}</div>
        <img src={currDog.src} alt={currDog.name}/>
        <div>Age: {currDog.age}</div>
        <div>
            Facts:
            <ul>
            {currDog.facts.map(f => <li>{f}</li>)}
            </ul>
        </div>
    </div>
    );
}

export default DogDetails;