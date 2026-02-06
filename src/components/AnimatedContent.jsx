
import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";

const AnimatedContent = ({
    children,
    distance = 100,
    direction = "vertical",
    reverse = false,
    config = { tension: 50, friction: 25 },
    initialOpacity = 0,
    animateOpacity = 1,
    scale = 1,
    threshold = 0.1,
    delay = 0,
    className = ""
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const directions = {
        vertical: "y",
        horizontal: "x",
    };

    const springVariant = {
        hidden: {
            [directions[direction]]: reverse ? -distance : distance,
            opacity: initialOpacity,
            scale: scale,
        },
        visible: {
            [directions[direction]]: 0,
            opacity: animateOpacity,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: config.tension,
                damping: config.friction,
                delay: delay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={springVariant}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContent;
