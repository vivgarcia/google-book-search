import React from "react";
import "./style.css";

function FlexContainer(props) {
    return (
        <div className="flex-container">{props.children}</div>
    );
}

export default FlexContainer;