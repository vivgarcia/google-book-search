import React from "react";
import "./style.css";

function Tag(props) {
    return (
        <div className="tag" onClick={() => props.click(props.name)}>{props.name}</div>
    );
}

export default Tag;