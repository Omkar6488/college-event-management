import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Users, Award, ArrowRight, Sparkles, Zap, Shield, Brain, Star, Trophy, Target, Rocket, CheckCircle2 } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import { getFeaturedEvents } from '../data/events';

const LandingPage = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setFeaturedEvents(getFeaturedEvents().slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      
      {/* Revolutionary Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 dark:bg-primary-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-8"
            >
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Revolutionizing College Event Management</span>
            </motion.div>

            {/* Main Heading with Gradient Text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            >
              <span className="block text-gray-900 dark:text-white mb-2">
                Discover Your
              </span>
              <span className="block bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Next Experience
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of students in creating unforgettable memories. 
              From tech competitions to cultural festivals - your journey starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/events')}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">Explore Events</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/verify')}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg border-2 border-gray-200 dark:border-gray-700"
              >
                <Shield size={24} />
                <span>Verify Certificate</span>
              </motion.button>
            </motion.div>

            {/* Stats Cards with 3D Effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
            >
              {[
                { icon: Calendar, value: '200+', label: 'Events Annually', color: 'from-blue-500 to-cyan-500' },
                { icon: Users, value: '10K+', label: 'Active Students', color: 'from-purple-500 to-pink-500' },
                { icon: Trophy, value: '95%', label: 'Success Rate', color: 'from-green-500 to-emerald-500' },
                { icon: Award, value: '500+', label: 'Certificates Issued', color: 'from-yellow-500 to-orange-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  <stat.icon className={`mx-auto mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} size={32} />
                  <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.5 }, y: { duration: 1.5, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center pt-2">
            <motion.div className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section with Scroll Animations */}
      <FeatureSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Featured Events Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full mb-4 text-sm font-semibold">
              <Star size={16} />
              Featured Events
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Don't Miss Out
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Exciting events happening this month - register now before spots fill up!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/events')}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
            >
              View All Events
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* AI Verification CTA Section */}
      <AIVerificationSection />

      {/* Testimonials/Social Proof */}
      <TestimonialsSection />

      {/* Final CTA */}
      <FinalCTASection navigate={navigate} />
    </div>
  );
};

// Feature Section Component
const FeatureSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Registration',
      description: 'Register for events in seconds with our streamlined process. No paperwork, no hassle.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered Verification',
      description: 'Advanced AI system verifies certificates instantly. No fake certificates, 100% authentic.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Your data is encrypted and secure. Trusted by 500+ companies for placement verification.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Digital Certificates',
      description: 'Earn verifiable digital certificates. Share with recruiters instantly during placements.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Personalized Recommendations',
      description: 'Get event suggestions based on your interests and department. Never miss relevant events.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'Build your achievement portfolio. Track certificates, skills, and accomplishments.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
            <Rocket size={16} />
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern features designed for today's students. From event discovery to certificate verification.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
      
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
      >
        <feature.icon className="text-white" size={32} />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    { step: '01', title: 'Browse Events', description: 'Explore technical, cultural, sports events and workshops', icon: Calendar },
    { step: '02', title: 'Register Instantly', description: 'One-click registration with instant confirmation', icon: Zap },
    { step: '03', title: 'Participate & Win', description: 'Showcase your skills and earn recognition', icon: Trophy },
    { step: '04', title: 'Get Verified Certificate', description: 'Receive AI-verified digital certificates', icon: Award }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 size={16} />
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Four simple steps to start your amazing journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="text-6xl font-black text-primary-200 dark:text-primary-900/40 mb-4">{step.step}</div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-primary-500 to-accent-500 z-10"
                  style={{ originX: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// AI Verification CTA Section
const AIVerificationSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Brain size={64} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            AI-Powered Certificate Verification
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            No more fake certificates! Our advanced AI system verifies certificates by matching details against our secure database. Perfect for HR and placement verification.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/verify'}
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3 text-lg"
          >
            <Shield size={24} />
            Try AI Verification Now
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "HR Manager, TechCorp",
      content: "The AI verification system saved us hours during campus placements. Instant certificate verification!",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Priya Sharma",
      role: "Final Year Student",
      content: "Love how easy it is to register for events and track my certificates. My portfolio looks amazing!",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Dr. Amit Patel",
      role: "Event Coordinator",
      content: "Managing events has never been easier. The platform handles everything from registration to certificates.",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-semibold mb-4">
            <Star size={16} />
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Loved by Students & HR
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = ({ navigate }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-700 dark:to-accent-700 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 10,000+ students already using CampusCred to discover amazing experiences
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/events')}
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3 text-lg"
            >
              Get Started Free
              <Rocket size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard/student')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center gap-3 text-lg"
            >
              View Dashboard
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPage;
