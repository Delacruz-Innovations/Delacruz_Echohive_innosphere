import { useEffect } from "react";

const CalendlyTracker = () => {
    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data?.event === "calendly.event_scheduled") {
                console.log("Calendly booking completed:", e.data.payload);

                // Optional: send to analytics
                if (window.gtag) {
                    window.gtag("event", "conversion", {
                        event_category: "Calendly",
                        event_label: "Strategy Call Booked",
                    });
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return null;
};

export default CalendlyTracker;
