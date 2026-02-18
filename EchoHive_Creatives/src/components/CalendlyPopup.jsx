import React from "react";
import { PopupButton } from "react-calendly";

const CalendlyPopup = ({
    text = "Book a Free Consultation",
    className = "",
    children
}) => {
    return (
        <PopupButton
            url="https://calendly.com/free-quote-echohivecreatives/30min"
            rootElement={document.getElementById("root")}
            text={text}
            className={className}
        >
            {children || text}
        </PopupButton>
    );
};

export default CalendlyPopup;
