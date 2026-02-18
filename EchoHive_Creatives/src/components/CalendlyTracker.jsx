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

                // Optional: send to Facebook Pixel
                if (window.fbq) {
                    window.fbq("track", "Schedule", {
                        content_name: "Strategy Call",
                    });
                }

                // Optional: send to other analytics platforms
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: "calendly_booking_completed",
                        calendly_event_type: "strategy_call",
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
