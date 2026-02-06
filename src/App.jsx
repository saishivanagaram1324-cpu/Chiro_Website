import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Modal, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Bone, User, CheckCircle, ChevronRight, Menu, Loader2, Star, Quote, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import DotGrid from './components/DotGrid';
import { supabase } from './lib/supabase';
import AssistantHelpdesk from './components/AssistantHelpdesk';
import TestimonialCarousel from './components/TestimonialCarousel';
import { Dock, DockCard } from './components/Dock';
import AnimatedContent from './components/AnimatedContent';


const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('South Mumbai');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        preferred_date: '',
        notes: ''
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openBooking = (location) => {
        // Map general or clinic names to the dropdown values
        if (location === 'General') {
            setSelectedLocation('');
        } else if (location === 'South Mumbai') {
            setSelectedLocation('South Mumbai Center');
        } else if (location === 'Andheri') {
            setSelectedLocation('Andheri West Center');
        } else {
            setSelectedLocation(location);
        }

        setShowModal(true);
        setBookingSuccess(false);
        setSubmitError(null);
        setFormData({
            full_name: '',
            phone: '',
            email: '',
            preferred_date: '',
            notes: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const { error } = await supabase
                .from('appointments')
                .insert([{
                    full_name: formData.full_name,
                    phone: formData.phone,
                    email: formData.email || null,
                    preferred_date: formData.preferred_date || null,
                    location: selectedLocation,
                    notes: formData.notes || null,
                    status: 'pending'
                }]);

            if (error) throw error;

            setBookingSuccess(true);
        } catch (error) {
            console.error('Booking error:', error);
            setSubmitError('Failed to submit booking. Please try again or call us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Treatments', href: '#treatments' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Locations', href: '#locations' },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="relative min-h-screen bg-brand-offwhite text-brand-slate overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Subtle Dot Pattern Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#2F3A36 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                {/* Large smooth curve mimicking the reference - subtle white/light overlay */}
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-brand-sand/20 to-transparent blur-[80px] opacity-70" />

                {/* Secondary organic shape */}
                <div className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-brand-accent/5 via-brand-sand/10 to-transparent blur-[100px] opacity-60" />

                {/* Accent highlight */}
                <div className="absolute top-[40%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-brand-primary/5 blur-[120px]" />

                {/* Structural geometric curve overlay */}
                <svg className="absolute top-0 right-0 h-full w-[60vw] opacity-30 text-brand-sand" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M100 0 C 50 0 50 100 0 100 L 100 100 Z" fill="url(#curveGradient)" />
                    <defs>
                        <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10">
                {/* Topbar */}
                <div className="bg-brand-primary text-white py-2 d-none d-md-block border-bottom border-brand-accent">
                    <Container>
                        <div className="d-flex justify-content-between align-items-center text-sm">
                            <div className="d-flex gap-4">
                                <span className="d-flex align-items-center gap-2"><Phone size={14} className="text-brand-accent" /> +91 99203 27166</span>
                                <span className="d-flex align-items-center gap-2"><Mail size={14} className="text-brand-accent" /> vaibbhavguray@gmail.com</span>
                            </div>
                            <div className="bg-brand-accent text-brand-primary px-3 py-1 fw-bold text-xs">
                                IPHM CERTIFIED CLINIC
                            </div>
                        </div>
                    </Container>
                </div>

                {/* Navbar */}
                <Navbar
                    expand="lg"
                    sticky="top"
                    className={`transition-all duration-300 ${scrolled ? 'bg-brand-offwhite/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}
                >
                    <Container>
                        <Navbar.Brand href="#home" className="d-flex align-items-center group">
                            <div className="flex items-center gap-3 pl-2 pr-6 py-2 rounded-full bg-brand-sand/20 border border-brand-primary/5 transition-all duration-300 hover:bg-brand-sand/40 hover:border-brand-primary/10">
                                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src="/images/chiro-logo.png"
                                        alt="Dr. Vaibbhav Guray"
                                        className="w-6 h-6 object-contain brightness-0 invert opacity-90"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-display font-bold text-brand-primary tracking-wide text-lg leading-none">DR. VAIBBHAV GURAY</span>
                                    <span className="text-[10px] text-brand-slate/60 font-bold tracking-[0.2em] uppercase pt-1">Chiropractic Excellence</span>
                                </div>
                            </div>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none">
                            <Menu className="text-brand-primary" />
                        </Navbar.Toggle>

                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="ms-auto align-items-center gap-4">
                                {navLinks.map((link) => (
                                    <Nav.Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-brand-primary fw-semibold relative group"
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                                    </Nav.Link>
                                ))}
                                <button
                                    onClick={() => openBooking('South Mumbai')}
                                    className="btn-default"
                                >
                                    Book Appointment
                                </button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <main>
                    {/* Hero Section - The "Grey Area" with DotGrid */}
                    <section id="home" className="relative h-[85vh] flex items-center overflow-hidden">
                        <div className="absolute inset-0 bg-brand-offwhite/40 z-0">
                            <img
                                src="/images/dr-vaibbhav-guray-andheri-west-mumbai-chiropractic-doctors-5tpdkl85c4.avif"
                                alt="Dr. Vaibbhav Guray Practice"
                                className="w-full h-full object-cover opacity-20"
                            />
                            {/* DotGrid is ONLY here now */}
                            <div className="absolute inset-0 opacity-20">
                                <DotGrid
                                    dotSize={3}
                                    gap={25}
                                    baseColor="#AEBEC0"
                                    activeColor="#9CAF88"
                                    proximity={150}
                                    shockRadius={300}
                                />
                            </div>
                        </div>

                        <Container className="relative z-10 text-brand-primary">
                            <Row>
                                <Col lg={7}>
                                    <AnimatedContent distance={150} direction="horizontal" reverse={true} config={{ tension: 80, friction: 20 }}>
                                        <h1 className="display-3 font-display font-black mb-4">
                                            World-Class Spinal Care <br />
                                            <span className="text-brand-accent underline decoration-brand-primary/10 underline-offset-8">in Mumbai</span>
                                        </h1>
                                        <p className="lead mb-8 text-gray-700 max-w-xl">
                                            Experience precision chiropractic adjustments by Dr. Vaibbhav Guray,
                                            globally trained to support non-invasive recovery.
                                        </p>
                                        <div className="d-flex flex-wrap gap-4">
                                            <button className="btn-default btn-highlighted" onClick={() => openBooking('General')}>
                                                Book a Consultation
                                            </button>
                                            <button className="btn-default" onClick={() => document.getElementById('locations').scrollIntoView()}>
                                                Our Clinics
                                            </button>
                                        </div>
                                    </AnimatedContent>
                                </Col>
                            </Row>
                        </Container>

                        {/* Scroll Down Indicator */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                            <img src="/images/scroll-down.png" alt="Scroll Down" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
                        </div>
                    </section>

                    {/* Rest of the sections without DotGrid background */}
                    <section id="about" className="py-24 relative">
                        <Container>
                            <Row className="align-items-center">
                                <Col lg={5} className="mb-12 mb-lg-0">
                                    <AnimatedContent distance={100} direction="horizontal" reverse={true} config={{ tension: 50, friction: 25 }}>
                                        <div className="relative">
                                            <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl">
                                                <img
                                                    src="/images/Dr.Vaibbhav Pfp.avif"
                                                    alt="Dr. Vaibbhav Guray"
                                                    className="img-fluid w-full"
                                                />
                                            </div>
                                            <div className="absolute top-8 left-8 w-full h-full border-4 border-accent -z-10"></div>
                                        </div>
                                    </AnimatedContent>
                                </Col>
                                <Col lg={7} className="ps-lg-5">
                                    <AnimatedContent distance={100} direction="vertical" config={{ tension: 50, friction: 25 }} delay={0.2}>
                                        <h6 className="text-brand-accent fw-bold tracking-widest uppercase mb-4">Mumbai's Recognised Expert</h6>
                                        <h2 className="display-5 font-display mb-6 text-brand-primary">Expertise in Precision <br />Chiropractic Care</h2>
                                        <p className="lead text-gray-700 mb-6 font-medium italic">
                                            "My mission is to help people live a normal life, without worrying about constant pain."
                                        </p>
                                        <p className="mb-8 text-gray-600 leading-relaxed">
                                            Dr. Vaibbhav Guray integrates international chiropractic standards with detailed problem assessment to treat specific pains, so you can move with less pain and more confidence.
                                        </p>
                                        <Row className="g-4">
                                            {[
                                                { label: 'Experience', val: '12+ Years' },
                                                { label: 'Google Rating', val: '5-Star' },
                                                { label: 'Globally Recognised', val: 'IPHM Certified' }
                                            ].map((stat) => (
                                                <Col key={stat.label} xs={12} md={4}>
                                                    <div className="border-l-2 border-brand-accent ps-4 mb-4 mb-md-0">
                                                        <h4 className="text-brand-primary font-bold m-0">{stat.val}</h4>
                                                        <small className="uppercase tracking-tighter text-gray-500 font-bold">{stat.label}</small>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </AnimatedContent>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section id="treatments" className="py-24 bg-brand-sand/30 text-brand-primary overflow-hidden">
                        <Container>
                            <div className="text-center mb-16">
                                <motion.h2 {...fadeInUp} className="display-5 font-display">Targeted Care for Real Pain</motion.h2>
                                <div className="h-1 w-20 bg-brand-accent mx-auto mt-4"></div>
                            </div>
                            <Row className="g-4">
                                {[
                                    { icon: <Bone size={28} />, title: 'Precision Adjustments', desc: 'When your back is locked, stiff, or painful, precise adjustments help restore natural movement and reduce strain.' },
                                    { icon: <CheckCircle size={28} />, title: 'Pain Prevention & Recovery', desc: 'Focused care designed to reduce recurrence, support recovery, and help your body stay resilient over time.' },
                                    { icon: <User size={28} />, title: 'Posture Alignment', desc: 'We assess your lifestyle and correct posture patterns that quietly damage your joints through long-term stress.' },
                                ].map((item, idx) => (
                                    <Col key={idx} md={4}>
                                        <motion.div
                                            {...fadeInUp}
                                            whileHover={{ y: -8 }}
                                            className="relative p-8 h-full bg-brand-offwhite rounded-2xl border border-brand-primary/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:bg-brand-forest hover:border-brand-forest group overflow-hidden"
                                        >
                                            {/* Decorative circle for hover effect */}
                                            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full transition-transform duration-500 group-hover:scale-150"></div>

                                            <div className="relative z-10">
                                                <div className="w-14 h-14 rounded-xl bg-brand-sand/50 flex items-center justify-center text-brand-primary mb-6 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-brand-accent">
                                                    {item.icon}
                                                </div>

                                                <h3 className="font-display text-xl font-bold mb-3 text-brand-primary transition-colors duration-300 group-hover:text-brand-offwhite">
                                                    {item.title}
                                                </h3>

                                                <p className="text-brand-slate/70 leading-relaxed transition-colors duration-300 group-hover:text-brand-offwhite/80">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                            <div className="text-center mt-12">
                                <motion.p {...fadeInUp} className="lead text-brand-primary font-medium">
                                    Looking for a specific solution that <span className="italic text-brand-accent">works for you</span>? <button onClick={() => openBooking('General')} className="text-brand-primary underline decoration-brand-accent underline-offset-4 hover:text-brand-accent transition-colors font-bold bg-transparent border-0 p-0 inline">Book a consultation.</button>
                                </motion.p>
                            </div>
                        </Container>
                    </section>
                    <section id="testimonials" className="py-24 relative overflow-hidden">
                        <Container>
                            <div className="text-center mb-16">
                                <motion.h2 {...fadeInUp} className="display-5 font-display text-brand-primary">Patient Experiences</motion.h2>
                                <div className="h-1 w-20 bg-brand-accent mx-auto mt-4"></div>
                            </div>
                            <TestimonialCarousel />

                        </Container>
                    </section>

                    {/* Minimalist Separator Pattern */}



                    <section id="locations" className="py-24 relative">
                        <Container>
                            <div className="text-center mb-16">
                                <motion.h2 {...fadeInUp} className="display-5 font-display text-brand-primary">Centres of Excellence</motion.h2>
                                <div className="h-1 w-20 bg-brand-accent mx-auto mt-4 mb-6"></div>
                                <motion.p {...fadeInUp} className="lead text-brand-slate/70 max-w-2xl mx-auto">
                                    State-of-the-art facilities designed for precision diagnosis and effective recovery.
                                    Visit us in South Mumbai or Andheri West.
                                </motion.p>
                            </div>
                            <Row className="g-5 justify-content-center w-full">
                                <Col md={6} lg={5} className="mb-8 md:mb-0">
                                    <motion.div
                                        {...fadeInUp}
                                        className="h-100 bg-brand-sand/30 rounded-xl overflow-hidden shadow-lg border border-brand-primary/5 hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="h-48 md:h-64 overflow-hidden relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80"
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                alt="South Mumbai Center"
                                            />
                                            <div className="absolute inset-0 bg-brand-primary/10"></div>
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h3 className="font-display text-brand-primary text-2xl mb-4">South Mumbai Center</h3>

                                            <div className="flex gap-3 mb-8">
                                                <MapPin className="text-brand-accent flex-shrink-0 mt-1" size={20} />
                                                <div className="text-brand-slate/80 text-sm leading-relaxed space-y-1">
                                                    <p className="font-bold text-base text-brand-primary mb-1">Opera House, Sandhurst Bridge</p>
                                                    <p>534, Bombay Mutual Terrace, 2nd Floor</p>
                                                    <p className="text-brand-slate/60 text-xs uppercase tracking-wide pt-2 border-t border-brand-primary/10 mt-2">
                                                        Above Canto Restaurant,<br />Opp. Standard Chartered Bank
                                                    </p>
                                                    <p className="font-medium pt-1">Mumbai - 400007</p>
                                                </div>
                                            </div>

                                            <button onClick={() => openBooking('South Mumbai Center')} className="w-full btn-default text-sm py-3">
                                                Book at South Mumbai
                                            </button>
                                        </div>
                                    </motion.div>
                                </Col>

                                <Col md={6} lg={5}>
                                    <motion.div
                                        {...fadeInUp}
                                        className="h-100 bg-brand-sand/30 rounded-xl overflow-hidden shadow-lg border border-brand-primary/5 hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="h-48 md:h-64 overflow-hidden relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                alt="Andheri West Center"
                                            />
                                            <div className="absolute inset-0 bg-brand-primary/10"></div>
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <h3 className="font-display text-brand-primary text-2xl mb-4">Andheri West Center</h3>

                                            <div className="flex gap-3 mb-8">
                                                <MapPin className="text-brand-accent flex-shrink-0 mt-1" size={20} />
                                                <div className="text-brand-slate/80 text-sm leading-relaxed space-y-1">
                                                    <p className="font-bold text-base text-brand-primary mb-1">Lokhandwala Market</p>
                                                    <p>A101, Sunrise Building</p>
                                                    <p className="text-brand-slate/60 text-xs uppercase tracking-wide pt-2 border-t border-brand-primary/10 mt-2">
                                                        Above Bank of Maharashtra,<br />Next to McDonald's
                                                    </p>
                                                    <p className="font-medium pt-1">Andheri West, Mumbai - 400053</p>
                                                </div>
                                            </div>

                                            <button onClick={() => openBooking('Andheri West Center')} className="w-full btn-default text-sm py-3">
                                                Book at Andheri West
                                            </button>
                                        </div>
                                    </motion.div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>

                <footer className="bg-brand-primary text-white/80 py-20 border-t border-white/5">
                    <Container>
                        <Row className="g-5">
                            <Col lg={5}>
                                <h2 className="font-display text-white font-bold text-3xl mb-6">DR. VAIBBHAV GURAY</h2>
                                <p className="mb-8 leading-relaxed">Globally trained expertise delivering international standards of chiropractic care.</p>
                            </Col>
                            <Col lg={4}>
                                <h5 className="text-white font-display mb-6">Contact</h5>
                                <div className="flex flex-col gap-4 text-sm">
                                    <p className="m-0 flex items-center gap-3"><Mail size={16} /> vaibbhavguray@gmail.com</p>
                                    <p className="m-0 flex items-center gap-3"><Phone size={16} /> +91 99203 27166</p>
                                </div>
                            </Col>
                            <Col lg={3} className="text-center text-lg-end">
                                <h5 className="text-white font-display mb-6">Social Media</h5>
                                <div className="flex gap-4 justify-center lg:justify-end">
                                    <a href="https://www.instagram.com/nourish_transform_shine/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-primary text-white/80 transition-all duration-300">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="https://www.facebook.com/nourishtransformshine/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-primary text-white/80 transition-all duration-300">
                                        <Facebook size={24} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/dr-vaibbhav-guray-iphm-5b4378155/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-primary text-white/80 transition-all duration-300">
                                        <Linkedin size={24} />
                                    </a>
                                    <a href="https://www.youtube.com/@nourishtransformshine/videos" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-brand-accent hover:text-brand-primary text-white/80 transition-all duration-300">
                                        <Youtube size={24} />
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center mt-5 pt-4 border-top border-white/10 small">
                            <p>&copy; 2026 Dr. Vaibbhav Guray Chiropractic Excellence.</p>
                        </div>
                    </Container>
                </footer>

                <AssistantHelpdesk onBook={() => openBooking('General')} />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" contentClassName="rounded-none border-0 overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                    {!bookingSuccess ? (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="bg-brand-primary p-5 text-center text-white relative">
                                <h3 className="font-display text-3xl mb-0">Priority Booking</h3>
                                <p className="opacity-75 mb-0">{selectedLocation}</p>
                                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white border-0 bg-transparent text-2xl">&times;</button>
                            </div>
                            <Modal.Body className="p-8 bg-brand-offwhite">
                                <Form onSubmit={handleBookingSubmit}>
                                    <Row className="g-4">
                                        <Col md={6}>
                                            <Form.Label className="text-xs font-bold uppercase">Full Name *</Form.Label>
                                            <Form.Control
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleInputChange}
                                                required
                                                className="rounded-none py-3 border-gray-200"
                                                placeholder="John Doe"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="text-xs font-bold uppercase">Phone *</Form.Label>
                                            <Form.Control
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                type="tel"
                                                className="rounded-none py-3 border-gray-200"
                                                placeholder="+91 99203 27166"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="text-xs font-bold uppercase">Email</Form.Label>
                                            <Form.Control
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                type="email"
                                                className="rounded-none py-3 border-gray-200"
                                                placeholder="vaibbhavguray@gmail.com"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="text-xs font-bold uppercase">Preferred Date</Form.Label>
                                            <Form.Control
                                                name="preferred_date"
                                                value={formData.preferred_date}
                                                onChange={handleInputChange}
                                                type="date"
                                                className="rounded-none py-3 border-gray-200"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="text-xs font-bold uppercase">Clinic Location *</Form.Label>
                                            <Form.Select
                                                value={selectedLocation}
                                                onChange={(e) => setSelectedLocation(e.target.value)}
                                                required
                                                className="rounded-none py-3 border-gray-200"
                                            >
                                                <option value="" disabled>Select a location</option>
                                                <option value="South Mumbai Center">South Mumbai Center</option>
                                                <option value="Andheri West Center">Andheri West Center</option>
                                            </Form.Select>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Label className="text-xs font-bold uppercase">Additional Notes</Form.Label>
                                            <Form.Control
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                as="textarea"
                                                rows={3}
                                                className="rounded-none py-3 border-gray-200"
                                                placeholder="Describe your condition or any specific concerns..."
                                            />
                                        </Col>
                                        {submitError && (
                                            <Col xs={12}>
                                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                                    {submitError}
                                                </div>
                                            </Col>
                                        )}
                                        <Col xs={12} className="mt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full btn-default py-4 flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Request Consultation Slot'
                                                )}
                                            </button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal.Body>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-20 text-center bg-brand-offwhite">
                            <CheckCircle size={80} className="text-brand-accent mx-auto mb-6" />
                            <h3 className="font-display text-4xl mb-4 text-brand-primary">Request Sent</h3>
                            <p className="text-brand-slate/60 mb-10">Our concierge will contact you within 2 hours.</p>
                            <button className="btn-default btn-highlighted" onClick={() => setShowModal(false)}>Return to Site</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Modal>
        </div >
    );
};

export default App;
