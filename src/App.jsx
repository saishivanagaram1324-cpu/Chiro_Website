import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Modal, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Bone, User, CheckCircle, ChevronRight, Menu, Loader2 } from 'lucide-react';
import DotGrid from './components/DotGrid';
import { supabase } from './lib/supabase';

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
        setSelectedLocation(location);
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
        { name: 'Locations', href: '#locations' },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="relative min-h-screen bg-[#f9fbf9]">
            <div className="relative z-10">
                {/* Topbar */}
                <div className="bg-brand-primary text-white py-2 d-none d-md-block border-bottom border-brand-accent">
                    <Container>
                        <div className="d-flex justify-content-between align-items-center text-sm">
                            <div className="d-flex gap-4">
                                <span className="d-flex align-items-center gap-2"><Phone size={14} className="text-brand-accent" /> +91 99203 27166</span>
                                <span className="d-flex align-items-center gap-2"><Mail size={14} className="text-brand-accent" /> info@drvaibhavchiro.com</span>
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
                    className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}
                >
                    <Container>
                        <Navbar.Brand href="#home" className="d-flex align-items-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="me-2">
                                <path d="M12 2L10 4.5V7.5L12 10L14 7.5V4.5L12 2Z" fill="#7fb069" />
                                <path d="M12 10L10 12.5V15.5L12 18L14 15.5V12.5L12 10Z" fill="#7fb069" />
                                <path d="M12 18L10 20.5V22H14V20.5L12 18Z" fill="#7fb069" />
                                <circle cx="12" cy="12" r="10" stroke="#1e4d3a" strokeWidth="1" />
                            </svg>
                            <span className="font-display font-bold text-brand-primary tracking-tighter text-2xl">DR. VAIBBHAV GURAY</span>
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
                        <div className="absolute inset-0 bg-[#f9fbf9]/40 z-0">
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
                                    baseColor="#d0e0d0"
                                    activeColor="#1e4d3a"
                                    proximity={150}
                                    shockRadius={300}
                                />
                            </div>
                        </div>

                        <Container className="relative z-10 text-brand-primary">
                            <Row>
                                <Col lg={7}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <h1 className="display-3 font-display font-black mb-4">
                                            World-Class Spinal Care <br />
                                            <span className="text-brand-accent underline decoration-brand-primary/10 underline-offset-8">in Mumbai</span>
                                        </h1>
                                        <p className="lead mb-8 text-gray-700 max-w-xl">
                                            Experience precision chiropractic adjustments by Dr. Vaibbhav Guray,
                                            globally trained to provide non-invasive recovery and elite performance enhancement.
                                        </p>
                                        <div className="d-flex flex-wrap gap-4">
                                            <button className="btn-default" onClick={() => document.getElementById('locations').scrollIntoView()}>
                                                Our Clinics
                                            </button>
                                            <button className="btn-default btn-highlighted" onClick={() => openBooking('General')}>
                                                Consultation
                                            </button>
                                        </div>
                                    </motion.div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    {/* Rest of the sections without DotGrid background */}
                    <section id="about" className="py-24 bg-white">
                        <Container>
                            <Row className="align-items-center">
                                <Col lg={5} className="mb-12 mb-lg-0">
                                    <motion.div {...fadeInUp} className="relative">
                                        <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl">
                                            <img
                                                src="/images/Dr.Vaibbhav Pfp.avif"
                                                alt="Dr. Vaibbhav Guray"
                                                className="img-fluid w-full"
                                            />
                                        </div>
                                        <div className="absolute top-8 left-8 w-full h-full border-4 border-accent -z-10"></div>
                                    </motion.div>
                                </Col>
                                <Col lg={7} className="ps-lg-5">
                                    <motion.div {...fadeInUp}>
                                        <h6 className="text-brand-accent fw-bold tracking-widest uppercase mb-4">The Expert</h6>
                                        <h2 className="display-5 font-display mb-6 text-brand-primary">Expertise in Human <br />Bio-Mechanics</h2>
                                        <p className="lead text-gray-700 mb-6 font-medium italic">
                                            "My mission is to optimize the human frame through scientific precision."
                                        </p>
                                        <p className="mb-8 text-gray-600 leading-relaxed">
                                            Dr. Vaibbhav Guray integrates international chiropractic standards (Gonstead & Diversified) with deep analytical insight.
                                        </p>
                                        <Row className="g-4">
                                            {[
                                                { label: 'Experience', val: '12+ Years' },
                                                { label: 'Patients', val: '5,000+' },
                                                { label: 'Status', val: 'IPHM Certified' }
                                            ].map((stat) => (
                                                <Col key={stat.label} xs={4}>
                                                    <div className="border-l-2 border-brand-accent ps-4">
                                                        <h4 className="text-brand-primary font-bold m-0">{stat.val}</h4>
                                                        <small className="uppercase tracking-tighter text-gray-500 font-bold">{stat.label}</small>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </motion.div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section id="treatments" className="py-24 bg-[#eff4ef] text-brand-primary overflow-hidden">
                        <Container>
                            <div className="text-center mb-16">
                                <motion.h2 {...fadeInUp} className="display-5 font-display">Specialized Treatments</motion.h2>
                                <div className="h-1 w-20 bg-brand-accent mx-auto mt-4"></div>
                            </div>
                            <Row className="g-4">
                                {[
                                    { icon: <Bone size={40} />, title: 'Spinal Alignment', desc: 'Precise manual manipulation to restore joint function.' },
                                    { icon: <User size={40} />, title: 'Sports Recovery', desc: 'Advanced protocols for injury prevention.' },
                                    { icon: <MapPin size={40} />, title: 'Posture Lab', desc: 'Scientific correction of tech-neck imbalances.' },
                                ].map((item, idx) => (
                                    <Col key={idx} md={4}>
                                        <motion.div
                                            {...fadeInUp}
                                            whileHover={{ y: -10 }}
                                            className="p-10 border border-brand-primary/5 bg-white h-100 transition-all duration-300 hover:bg-brand-primary group rounded-xl shadow-sm hover:shadow-xl"
                                        >
                                            <div className="text-brand-accent group-hover:text-brand-accent mb-6 transition-colors">{item.icon}</div>
                                            <h3 className="font-display mb-4 text-brand-primary group-hover:text-white transition-colors">{item.title}</h3>
                                            <p className="text-gray-600 group-hover:text-white/80 transition-colors">{item.desc}</p>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    <section id="locations" className="py-24 bg-white">
                        <Container>
                            <motion.div {...fadeInUp} className="mb-16">
                                <h2 className="display-5 font-display mb-4">Strategic Locations</h2>
                                <p className="lead text-gray-600">Access elite care at our premium centers across Mumbai.</p>
                            </motion.div>
                            <Row className="g-5">
                                {[
                                    { name: 'South Mumbai Center', loc: 'Marine Drive / Colaba', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80' },
                                    { name: 'Andheri West Center', loc: 'Link Road, Andheri West', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80' },
                                ].map((clinic) => (
                                    <Col key={clinic.name} md={6}>
                                        <motion.div {...fadeInUp} className="bg-white rounded-sm overflow-hidden shadow-xl group border border-gray-100">
                                            <div className="h-64 overflow-hidden relative">
                                                <img src={clinic.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={clinic.name} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                                            </div>
                                            <div className="p-10">
                                                <h3 className="font-display text-brand-primary text-2xl mb-2">{clinic.name}</h3>
                                                <p className="text-gray-500 flex items-center gap-2 mb-6">
                                                    <MapPin size={18} className="text-brand-accent" /> {clinic.loc}
                                                </p>
                                                <button onClick={() => openBooking(clinic.name)} className="w-full btn-default">
                                                    Schedule Slot <ChevronRight size={20} className="inline ms-2" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>
                </main>

                <footer className="bg-brand-primary text-white/50 py-20 border-t border-white/5">
                    <Container>
                        <Row className="g-5">
                            <Col lg={4}>
                                <h2 className="font-display text-white font-bold text-3xl mb-6">DR. VAIBBHAV GURAY</h2>
                                <p className="mb-8 leading-relaxed">Globally trained expertise delivering international standards of chiropractic care.</p>
                            </Col>
                            <Col lg={3}>
                                <h5 className="text-white font-display mb-6">Contact</h5>
                                <div className="flex flex-col gap-4 text-sm">
                                    <p className="m-0 flex items-center gap-3"><Mail size={16} /> info@drvaibhavchiro.com</p>
                                    <p className="m-0 flex items-center gap-3"><Phone size={16} /> +91 99203 27166</p>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <h5 className="text-white font-display mb-6">Priority Consultation</h5>
                                <button onClick={() => openBooking('General')} className="btn-default border-white/20 border-1 bg-transparent hover:bg-white/10">Start Your Recovery Journey</button>
                            </Col>
                        </Row>
                        <div className="text-center mt-5 pt-4 border-top border-white/10 small">
                            <p>&copy; 2026 Dr. Vaibbhav Guray Chiropractic Excellence.</p>
                        </div>
                    </Container>
                </footer>
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
                            <Modal.Body className="p-8">
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
                                                placeholder="your@email.com"
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
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-20 text-center bg-white">
                            <CheckCircle size={80} className="text-brand-accent mx-auto mb-6" />
                            <h3 className="font-display text-4xl mb-4">Request Sent</h3>
                            <p className="text-gray-500 mb-10">Our concierge will contact you within 2 hours.</p>
                            <button className="btn-default btn-highlighted" onClick={() => setShowModal(false)}>Return to Site</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Modal>
        </div >
    );
};

export default App;
