import React from "react";
import "./style.css";

function SearchBar(props) {
    return (
        <div>
            <form className="search-form" onSubmit={props.submit}>
                <input type="text" className="search-bar" name="search" onChange={props.change} placeholder="Search by Title, Author, ISBN..." />
                <button type="submit" className="search-button"><i className="fas fa-search"></i></button>
            </form>
        </div>
    );
}

export default SearchBar;