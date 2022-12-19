import { useState } from "react";
import axios from "axios";


const addCard = async (url) => {
    const [response, setResponse] = useState(null);
    const card = await axios.get(url);
    setResponse(cards => [...cards, { ...response.data, id: uuid() }]);
  };