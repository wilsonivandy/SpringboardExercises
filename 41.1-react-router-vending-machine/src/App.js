import React from "react";

import Cheetos from "./Cheetos";
import Chips from "./Chips";
import Nachos from "./Nachos";
import Home from './Home'
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import './App.css'

import { BrowserRouter, Route } from "react-router-dom";

const toHome = () => {
  return (
    <NavLink exact to="/" className="route">
    Home
   </NavLink>
    )
}

const toChips = () => {
  return (
    <NavLink exact to="/chips" className="route">
    Chips
  </NavLink>)
}

const toNachos = () => {
  return (
    <NavLink exact to="/nachos" className="route">
    Nachos
  </NavLink>)
}

const toCheetos = () => {
  return (
    <NavLink exact to="/cheetos" className="route">
    Cheetos
  </NavLink>)
}

function App() {
  return (
    <div className="App route">
      <BrowserRouter>
        <Route exact path="/">
          {toCheetos()}
          {toChips()}
          {toNachos()}
          <Home/>
        </Route>
        <Route exact path="/cheetos">
          {toHome()}
          <Cheetos />
        </Route>
        <Route exact path="/nachos">
          {toHome()}
          <Nachos />
        </Route>
        <Route exact path="/chips">
          {toHome()}
          <Chips />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;