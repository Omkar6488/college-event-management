import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Mail,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle,
  Info
} from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { getEventById } from '../data/events';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const eventData = getEventById(id);
    setEvent(eventData);
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
    // Simulate registration
    setTimeout(() => {
      setIsRegistered(true);
      setShowRegisterModal(false);
    }, 1500);
  };

  const capacityPercentage = (event.registeredCount / event.maxParticipants) * 100;
  const spotsRemaining = event.maxParticipants - event.registeredCount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 transition-colors duration-300">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
        >
          <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
        </button>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold">
                  {event.category}
                </span>
                {event.featured && (
                  <span className="px-4 py-1 bg-accent-500 text-white rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <p className="text-xl text-gray-200">
                Organized by {event.organizer}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
                    <Calendar className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(event.date)}</p>
                    {event.endDate && event.endDate !== event.date && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">to {formatDate(event.endDate)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-accent-100 dark:bg-accent-900/30 p-3 rounded-lg">
                    <Clock className="text-accent-600 dark:text-accent-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <MapPin className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Venue</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                    <Users className="text-yellow-600 dark:text-yellow-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {event.registeredCount} / {event.maxParticipants}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Event */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Event</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {event.fullDescription}
              </p>
            </motion.div>

            {/* Event Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Agenda</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
                          <Clock className="text-primary-600 dark:text-primary-400" size={20} />
                        </div>
                        {index < event.agenda.length - 1 && (
                          <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">
                          {item.time}
                        </p>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Speakers/Organizers */}
            {event.speakers && event.speakers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Speakers & Organizers</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{speaker.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{speaker.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Registration Status</span>
                  <span className={`font-semibold ${spotsRemaining > 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {spotsRemaining} spots left
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${capacityPercentage > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>
              </div>

              {isRegistered ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
                  <div className="flex items-center text-green-700 mb-2">
                    <CheckCircle size={20} className="mr-2" />
                    <span className="font-semibold">You're Registered!</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Check your email for confirmation and event updates.
                  </p>
                </div>
              ) : (
                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={handleRegister}
                  disabled={spotsRemaining === 0}
                >
                  {spotsRemaining === 0 ? 'Event Full' : 'Register Now'}
                </Button>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                    isFavorite
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-2 border-red-600 dark:border-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                </button>
                <button className="flex-1 flex items-center justify-center py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>

            {/* Contact Organizer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Contact Organizer</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <User size={18} className="mr-2 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm">{event.organizer}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Mail size={18} className="mr-2 text-gray-400 dark:text-gray-500" />
                  <a href={`mailto:${event.organizerEmail}`} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    {event.organizerEmail}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Important Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6"
            >
              <div className="flex items-start">
                <Info size={20} className="text-blue-600 dark:text-blue-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Important Information</h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Registration closes 24 hours before the event</li>
                    <li>• Participants will receive a confirmation email</li>
                    <li>• Please bring your student ID card</li>
                    <li>• Certificates will be provided to all participants</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <Modal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          title="Registering for Event"
        >
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Processing your registration...</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventDetailsPage;
