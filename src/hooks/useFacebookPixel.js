import { useEffect } from 'react';

const PIXEL_ID = '700802772755280';

function loadFacebookPixel() {
    if (window.fbq) return; // Don't load again if already loaded

    // Define fbq function as per Facebook Pixel docs
    window.fbq = function () {
        window.fbq.callMethod
            ? window.fbq.callMethod.apply(window.fbq, arguments)
            : window.fbq.queue.push(arguments);
    };

    if (!window._fbq) window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];

    // Load the external script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    // Initialize after script loads
    script.onload = () => {
        window.fbq('init', PIXEL_ID);
        window.fbq('track', 'PageView');
    };
}

export default function useFacebookPixel() {
    useEffect(() => {
        loadFacebookPixel();
    }, []);
}
