import React from "react";
import { PopupButton } from "react-calendly";

const CalendlyPopup = ({
    text = "Book a Free Consultation",
    className = "",
    children
}) => {
    return (
        <PopupButton
            url="https://calendly.com/free-consultation-delacruzinnovations/30min"
            rootElement={document.getElementById("root")}
            text={children || text}
            className={className}
        />
    );
};

export default CalendlyPopup;
