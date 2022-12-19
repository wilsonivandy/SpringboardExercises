import { useState } from "react";
import axios from "axios";


function useFlip(initialVal = true) {
  // call useState, "reserve piece of state"
  const [value, setValue] = useState(initialVal);
  const flip = () => {
    setValue(oldValue => !oldValue);
  };
  
  // return piece of state AND a function to toggle it
  return [value, flip];
}

function useAxios(url) {
    const [responses, setResponses] = useState([]);
    const addData = async (name="") => {
        if (typeof name !== 'string') {
            name = "";
        }
        const card = await axios.get(`${url}${name}`);
        setResponses(data => [...data, card.data]);
    }
    return [responses, addData];
  };

export {useFlip, useAxios}