
import React, { useRef, createContext, useContext, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DockContext = createContext({
    mouseX: null,
    magnification: 1.1,
    distance: 140
});

export const Dock = ({ children, className = "", magnification = 1.1, distance = 140 }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <DockContext.Provider value={{ mouseX, magnification, distance }}>
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className={className}
            >
                {children}
            </motion.div>
        </DockContext.Provider>
    );
};

export const DockCard = ({ children, className = "", style }) => {
    const ref = useRef(null);
    const { mouseX, magnification, distance } = useContext(DockContext);

    const distanceCalc = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [1, magnification, 1]);
    const scale = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ scale, ...style }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
