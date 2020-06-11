import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
    return (
        <div className="navbar">
            <div className="links">
                <h6><Link to="/">Home</Link></h6>
                <h6><Link to="/saved">Saved</Link></h6>
            </div>
        </div>
    );
}

export default Navbar;