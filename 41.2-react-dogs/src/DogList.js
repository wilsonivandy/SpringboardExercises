import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './DogList.css'

function DogList({dogs}) {

    return (
        <div className='dogsDetail'>
            <h2 >All Dogs:</h2>    
            <div>
                {dogs.map(d => (
                <div key={d.name}>
                    <h3>
                        <Link to={`/dogs/${d.name.toLowerCase()}`}>{d.name}</Link>
                    </h3>
                    <img src={d.src} alt={d.name} />
                </div>
                ))}
            </div>  
        </div>
    )
}

export default DogList;