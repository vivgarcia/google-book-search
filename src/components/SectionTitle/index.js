import React from "react";
import "./style.css";

function SectionTitle(props) {
    return (
        <div className="section-title">
            <h3>{props.children}</h3>
        </div>
    );
}

export default SectionTitle;