import React from "react";
import Pokecard from "./Pokecard";
import "./Pokedex.css";

function Pokedex({pokemons}) {
    return (
        <div className="Pokedex">
            <h2 className="Pokedex-title">Pokedex</h2>    
            <div className="Pokedex-cards">
                {pokemons.map(p => <Pokecard
                    id={p.id}
                    name={p.name}
                    type={p.type}
                    experience={p.base_experience}
                />)}
            </div>  
        </div>
        
    )
}

export default Pokedex;