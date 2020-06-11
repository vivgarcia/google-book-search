import React from "react";
import "./style.css";

function Results(props) {
    return (
        <div className="results">
            <a href={props.bookData.link} target="_blank" rel="noopener noreferrer" className="result-card">
                <div className="result-image">
                    <img src={props.bookData.image} className="book-image" alt={props.bookData.title}/> 
                </div>
                <div className="book-information">
                    <h5>{props.bookData.title}</h5>
                    <h6>By {props.bookData.author.toString().replace(/,/g, ", ")}</h6>
                    <p>{props.bookData.description}</p>
                </div>
            </a>
        </div>
    );
}

export default Results;