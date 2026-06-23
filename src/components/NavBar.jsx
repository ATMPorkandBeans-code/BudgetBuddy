import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    return (
        <div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/budget">Budget</NavLink>
        </nav>
        </div>
    )
}

export default NavBar;