import { useEffect } from "react";

const CalendlyTracker = () => {
    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data?.event === "calendly.event_scheduled") {
                console.log("✅ Calendly booking completed:", e.data.payload);

                // Optional: send to Google Analytics if available
                if (window.gtag) {
                    window.gtag("event", "conversion", {
                        event_category: "Calendly",
                        event_label: "Strategy Call Booked",
                        value: 1,
                    });
                }

                // Optional: send to React GA4 if available
                if (window.ReactGA) {
                    window.ReactGA.event({
                        category: "Calendly",
                        action: "Strategy Call Booked",
                        label: "Booking Completed",
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
