import React from "react";
import { NavLink } from "react-router-dom";
import './Nav.css'

const NavBar = (props) => {

    let dogs = props.dogs;
    // console.log(props.dogs);

    return (
        <nav className="NavBar">
            <NavLink exact to="/dogs" className="Navlink">
            Home
          </NavLink>
          {dogs.map(d => 
                <NavLink exact to={`/dogs/${d.name}`} className="Navlink">
                    {d.name}
                </NavLink>
            )}
          {/* <NavLink exact to="/dogs">
            Dogs
          </NavLink>
          <NavLink exact to="/dogs/:name">
            DogName
          </NavLink> */}
        </nav>
      ); 
}


// function NavBar() {
//   return (
//     <nav className="NavBar">
//       <NavLink exact to="/">
//         Home
//       </NavLink>
//       <NavLink exact to="/eat">
//         Eat
//       </NavLink>
//       <NavLink exact to="/drink">
//         Drink
//       </NavLink>
//     </nav>
//   );
// }

export default NavBar;