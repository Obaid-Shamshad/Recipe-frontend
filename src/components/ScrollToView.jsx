import React from 'react'
import { useLocation } from 'react-router-dom';

function ScrollToView() {
    const location = useLocation();

    React.useEffect(() => {
        setTimeout(() => {
            const yOffset = 80;

            if (location.hash) {
                const element = document.querySelector(location.hash);
                const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
                if (element) {
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        }, 100);
    }, [location]);

    return null;
}

export default ScrollToView
