import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Phone, ChevronsRight } from "lucide-react";

const SwipeToCall = () => {
    const [swiped, setSwiped] = useState(false);
    const x = useMotionValue(0);
    const width = 180; // Total width of the slider track
    const handleSize = 40; // Size of the sliding knob
    const dragConstraints = width - handleSize - 8; // 8px padding

    const backgroundOpacity = useTransform(x, [0, dragConstraints], [1, 0.5]);
    const textOpacity = useTransform(x, [0, dragConstraints / 2], [1, 0]);
    const chevronOpacity = useTransform(x, [0, dragConstraints / 1.5], [0.8, 0]);

    const handleDragEnd = (_, info) => {
        if (info.offset.x > dragConstraints * 0.5) {
            setSwiped(true);
            window.location.href = "tel:+919920327166";

            // Reset after a delay
            setTimeout(() => {
                setSwiped(false);
                x.set(0);
            }, 5000);
        } else {
            // Snap back if not swiped enough
            x.set(0);
        }
    };

    return (
        <div className="relative flex items-center md:hidden mx-2">
            {/* Track */}
            <motion.div
                className="relative overflow-hidden rounded-full bg-brand-primary flex items-center h-[46px] shadow-inner border border-brand-primary/10"
                style={{ width }}
            >
                {/* Fill Effect (Optional, e.g. revealing a green color) */}
                <motion.div
                    className="absolute inset-y-0 left-0 bg-brand-accent/20 z-0"
                    style={{ width: x }}
                />

                {/* Text Label */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pr-2 pl-8"
                    style={{ opacity: textOpacity }}
                >
                    <span className="text-brand-offwhite text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                        Swipe to Call
                    </span>
                </motion.div>

                {/* Animated Chevron Hint */}
                <motion.div
                    className="absolute right-3 z-10 text-white/20 pointer-events-none"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ opacity: chevronOpacity }}
                >
                    <ChevronsRight size={16} />
                </motion.div>

                {/* Draggable Handle */}
                <motion.div
                    className="absolute left-1 z-20 w-[38px] h-[38px] rounded-full bg-brand-accent shadow-lg flex items-center justify-center border border-white/20 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: dragConstraints }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    style={{ x }}
                    whileTap={{ scale: 1.1 }}
                >
                    <Phone size={18} className="text-brand-primary fill-brand-primary" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SwipeToCall;
