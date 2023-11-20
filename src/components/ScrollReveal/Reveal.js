import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const Reveal = ({ children }) => {
    const ref = useRef(null);
    const mainControl = useAnimation();

    useEffect(() => {
        const onScroll = () => {
            if (ref.current && isInViewport(ref.current)) {
                mainControl.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.2 }
                });
                window.removeEventListener('scroll', onScroll);
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [mainControl]);

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    return (
        <div ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={mainControl}
                style={{ overflow: 'hidden' }}
            >
                {children}
            </motion.div>
        </div>
    );
};

/* export default Reveal; */
