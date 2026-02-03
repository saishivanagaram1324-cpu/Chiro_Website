import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        "id": 1,
        "name": "Shipra Bhandari",
        "role": "Patient",
        "rating": 5,
        "review": "My first chiropractic session with Dr Vaibbhav was exceptional, especially in addressing my back, shoulder and leg joint discomfort. The practitioner took time to assess the tension in my upper back and the mobility of my shoulder, clearly explaining what was contributing to my pain while working on laptop everyday. The adjustments were precise and comfortably performed, and I could immediately feel a release of tightness across my shoulder blade, knees and lower back. The combination of gentle spinal alignment and focused work on the shoulder joint greatly improved my range of motion and reduced the stiffness I’ve been struggling with for months. I left the session feeling lighter, more aligned, and genuinely cared for. This was one of the most effective and reassuring chiropractic experiences I’ve had—highly recommended for anyone dealing with back, or shoulder issues."
    },
    {
        "id": 2,
        "name": "Moyez Bhanji",
        "role": "Patient",
        "rating": 5,
        "review": "I walked into Dr V Guray clinic with a neck collar and protruding L5-S1 slip disc on RHS. At the very first session, he managed to twist and adjust my back and right shoulder relieving me from the discomfort of the cervical spondylosis & knot in my neck base, sciatica pinched nerve in my back and down the right leg and additionally offering peace of mind. As these were both chronic conditions, subsequent 6 sessions he worked with cupping and TENS therapy offering relief & relaxation to the whole back with usual twists and adjustments at end of sessions. Final session, he applied feet palms pressure point therapy identifying any knots & unwinding the affected spots developed due to regular walking and/or jogging or playing sports. Currently, I am discomfort free though I intend to re-visit Dr V Guray for further sessions on my next travels to Mumbai in the not distant future to work further on both chronic issues which may re-occur as time will tell. Thank you Dr Vaibbhav Guray for your professional services offering relief to the body and peace of mind from the constant discomfort of pinched nerves!!"
    },
    {
        "id": 3,
        "name": "Ishaan",
        "role": "Patient",
        "rating": 5,
        "review": "Fantastic experience. I walked into Dr Guray’s clinic with a bad pull of my neck and shoulders that occurred just when I got up from bed due to improper sleeping posture. I only realised the extent of the muscle pull while i was in the gym and was unable to do particular workouts targeting my chest and shoulders, as my muscles were sore. I walked in, showed Dr Guray my shoulder and neck where the muscle was sore and the areas where i had pulled a muscle. He immediately started his chiro adjustments which helped with loosening up the muscles followed by cryo treatment with a special spray that provided immediate relief, which was done to promote blood flow in the area. He told me to take rest and come back next day if the problem persists. Although I was 70% better the next and I could use my arms and shoulders the next day, the pull and soreness was still there. When i went to Dr Vaibbhav the next day, he again started some adjustments. This time he could immediately sense the area of problem and pain accurately (because he had successfully isolated it the previous day) and with just two three adjustments the pain and discomfort was gone! It was like magic. There was no need for further follow ups because he had completely removed the soreness and pain and discomfort, not to mention he also completely cured the muscle pull in the shoulder and neck areas.. Dr Guray is an absolute genius, with complete knowledge and expertise in his field of interest. Would recommend him with eyes closed. Thank you Dr Vaibbhav."
    },
    {
        "id": 4,
        "name": "kirti said",
        "role": "Patient",
        "rating": 5,
        "review": "I recently visited Dr. Vaibbhav for neck and upper-back pain from long hours at the computer. He checked my posture and did a gentle adjustment, and I felt relief almost immediately. After a couple of sessions, my neck pain and headaches were much better. It was a very helpful and positive experience."
    },
    {
        "id": 5,
        "name": "Mala Vanjani",
        "role": "Patient",
        "rating": 5,
        "review": "I'm going through plantar fasciitis and sciatica lower back pain. Dr. Vaibbhav took the time to listen to my concerns and thoroughly assessed my condition before developing a treatment plan tailored specifically to my needs. Not only has my pain significantly improved, but I've also noticed an overall increase in my mobility and energy levels. He uses a combination of techniques that have been incredibly effective. I'm seeing a huge improvement in my pain relief. And Off course it takes few sessions to see the actual difference but its worth it. High recommend if you are looking to heal without medications and surgery."
    },
    {
        "id": 6,
        "name": "PRAGATI SANAP",
        "role": "Patient",
        "rating": 5,
        "review": "Excellent chiropractor. Dr. Vaibhav’s adjustments and cupping therapy gave me quick and noticeable relief. Very professional, gentle, and genuinely caring. Highly recommended."
    },
    {
        "id": 7,
        "name": "Aarti Kanthak",
        "role": "Patient",
        "rating": 5,
        "review": "dr vaibhav is one of thes chiropractors around, i got relief from my back pain in the 1st 2 sessions itself. he’s also helped me handle my weight issues to a great extent, thank u dr vaibhav n all the best"
    },
    {
        "id": 8,
        "name": "Khushii Mohapatra",
        "role": "Patient",
        "rating": 5,
        "review": "Better to try this to get your muscle and nerves aligned without medicine before trying or approaching allopathic medicines. Very effective instant improvement in a single visit, must try when needed or even just to experience better health 🙌"
    }
];

const TestimonialCard = ({ testimonial }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
                setIsTruncated(isOverflowing);
            }
        };

        checkTruncation();
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
    }, [testimonial.review]);

    return (
        <motion.div
            layout="position"
            className={`p-8 border border-brand-slate/10 bg-brand-sand rounded-2xl flex flex-col relative group hover:border-brand-accent/30 transition-shadow duration-500 shadow-sm hover:shadow-md ${isExpanded ? 'h-auto' : 'h-[420px]'}`}
        >
            <Quote className="absolute top-6 right-6 text-brand-accent/10 group-hover:text-brand-accent/20 transition-colors" size={48} />
            <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-brand-accent text-brand-accent" />
                ))}
            </div>

            <div className="flex-grow overflow-hidden flex flex-col">
                <div
                    ref={textRef}
                    className={`text-brand-slate italic leading-relaxed text-sm transition-all duration-300 ${isExpanded ? '' : 'line-clamp-[8]'}`}
                >
                    "{testimonial.review}"
                </div>
                {(isTruncated || isExpanded) && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="text-brand-accent text-xs font-bold mt-4 hover:underline focus:outline-none w-fit"
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-brand-slate/10">
                <h5 className="font-display text-brand-primary mb-1">{testimonial.name}</h5>
                <p className="text-xs text-brand-slate/60 uppercase tracking-widest font-bold mb-0">{testimonial.role}</p>
            </div>
        </motion.div>
    );
};

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const itemsToShow = 3;

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    // Calculate visible testimonials
    const visibleTestimonials = [];
    for (let i = 0; i < itemsToShow; i++) {
        visibleTestimonials.push(testimonials[(currentIndex + i) % testimonials.length]);
    }

    return (
        <div className="relative px-12"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}>
            <div className="flex gap-6 items-stretch min-h-[420px]">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visibleTestimonials.map((testimonial, idx) => (
                        <motion.div
                            key={`${testimonial.id}-${currentIndex}-${idx}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -50 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                                opacity: { duration: 0.4 }
                            }}
                            className="flex-1 min-w-0"
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 z-20"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 z-20"
            >
                <ChevronRight size={24} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-12">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-8 bg-brand-accent' : 'w-2 bg-brand-steel'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
