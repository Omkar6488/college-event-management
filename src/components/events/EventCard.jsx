import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';

const EventCard = ({ event, index = 0 }) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getCategoryColor = (category) => {
    const colors = {
      Technical: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      Cultural: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      Sports: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      Workshop: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return colors[category] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const capacity = event.maxParticipants;
  const registered = event.registeredCount;
  const capacityPercentage = (registered / capacity) * 100;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        rotateY: mousePosition.x * 0.5,
        rotateX: -mousePosition.y * 0.5,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 group"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
           style={{ transform: 'translateZ(10px)' }} />

      {/* Corner Decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Event Image with Parallax */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          style={{
            transform: `translateZ(20px) scale(1.1) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`
          }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Animated Sparkle Effect */}
        <motion.div
          className="absolute top-4 left-4 text-white/80"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={20} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Category Badge */}
        <motion.div 
          className="absolute top-3 right-3"
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getCategoryColor(event.category)} shadow-lg`}>
            {event.category}
          </span>
        </motion.div>

        {/* Featured Badge */}
        {event.featured && (
          <motion.div 
            className="absolute top-3 left-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="px-3 py-1.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
              <Sparkles size={12} />
              Featured
            </span>
          </motion.div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6 relative" style={{ transform: 'translateZ(10px)' }}>
        {/* Title with Gradient on Hover */}
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
          whileHover={{ x: 5 }}
        >
          {event.title}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Info with Stagger Animation */}
        <motion.div 
          className="space-y-2.5 mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: index * 0.1 + 0.2 }
            }
          }}
        >
          {[
            { Icon: Calendar, text: formatDate(event.date) },
            { Icon: Clock, text: event.time },
            { Icon: MapPin, text: event.venue }
          ].map(({ Icon, text }, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 group/item"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="mr-2"
              >
                <Icon size={16} className="text-primary-600 dark:text-primary-400 group-hover/item:text-accent-600 dark:group-hover/item:text-accent-400 transition-colors" />
              </motion.div>
              <span className="line-clamp-1">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Registration Progress with Enhanced Animation */}
        <div className="mb-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm mb-2.5">
            <span className="text-gray-600 dark:text-gray-300 flex items-center font-medium">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users size={16} className="mr-1.5 text-primary-600 dark:text-primary-400" />
              </motion.div>
              {registered} / {capacity} registered
            </span>
            <motion.span 
              className={`font-bold text-base ${capacityPercentage > 80 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
              animate={{ scale: capacityPercentage > 80 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1.5, repeat: capacityPercentage > 80 ? Infinity : 0 }}
            >
              {Math.round(capacityPercentage)}%
            </motion.span>
          </div>
          
          {/* Progress Bar Container with Glow */}
          <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden shadow-inner">
            {/* Progress Bar with Animation */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${capacityPercentage}%` }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.1 + 0.3,
                type: "spring",
                stiffness: 50
              }}
              className={`h-full rounded-full relative ${
                capacityPercentage > 80 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : 'bg-gradient-to-r from-green-500 to-green-600'
              }`}
            >
              {/* Animated Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Action Button with Advanced Hover */}
        <motion.button 
          className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn overflow-hidden relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Button Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <span className="relative z-10">View Details</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative z-10"
          >
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard;
