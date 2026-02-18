import React from "react";
import { PopupButton } from "react-calendly";

const CalendlyPopup = ({ text = "BOOK A FREE CONSULTATION", className = "" }) => {
    return (
        <PopupButton
            url="https://calendly.com/free-consultation-innosphereconsulting/30min"
            rootElement={document.getElementById("root")}
            text={text}
            className={className}
        />
    );
};

export default CalendlyPopup;
