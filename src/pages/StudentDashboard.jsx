import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  TrendingUp,
  Award,
  Clock,
  User,
  Mail,
  BookOpen,
  Edit,
  CheckCircle,
  XCircle,
  Trophy,
  Download,
  Shield,
  Copy,
  ExternalLink
} from 'lucide-react';
import EventCard from '../components/events/EventCard';
import StatsCard from '../components/common/StatsCard';
import Button from '../components/common/Button';
import { currentUser } from '../data/users';
import { events } from '../data/events';
import { getCertificatesByStudentId, getStudentAchievementStats } from '../data/certificates';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    // Get user's registered events
    const userEventIds = currentUser.registeredEvents;
    const userEvents = events.filter(e => userEventIds.includes(e.id));
    
    const now = new Date();
    const upcoming = userEvents.filter(e => new Date(e.date) >= now);
    const past = userEvents.filter(e => new Date(e.date) < now);
    
    setRegisteredEvents(userEvents);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'registered', label: 'My Events', icon: Calendar },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Get certificates
  const certificates = getCertificatesByStudentId(currentUser.id);
  const achievementStats = getStudentAchievementStats(currentUser.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full border-4 border-white/30"
                />
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
                  <p className="text-white/90">{currentUser.department} • {currentUser.year}</p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => navigate('/events')}>
                Browse Events
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-10 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Registered Events"
                value={registeredEvents.length}
                icon={Calendar}
                color="primary"
              />
              <StatsCard
                title="Upcoming Events"
                value={upcomingEvents.length}
                icon={Clock}
                color="accent"
              />
              <StatsCard
                title="Completed Events"
                value={pastEvents.length}
                icon={CheckCircle}
                color="success"
              />
              <StatsCard
                title="Certificates Earned"
                value={certificates.length}
                icon={Award}
                color="warning"
              />
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <button
                  onClick={() => setActiveTab('registered')}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View All
                </button>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.slice(0, 3).map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore and register for exciting events happening at college
                  </p>
                  <Button onClick={() => navigate('/events')}>
                    Browse Events
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-6 cursor-pointer"
                onClick={() => navigate('/events')}
              >
                <Calendar size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Explore Events</h3>
                <p className="text-white/90 text-sm">
                  Discover new events happening at college
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-xl p-6 cursor-pointer"
                onClick={() => setActiveTab('registered')}
              >
                <BookOpen size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">My Registrations</h3>
                <p className="text-white/90 text-sm">
                  View all your registered events
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 cursor-pointer"
                onClick={() => setActiveTab('certificates')}
              >
                <Award size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Certificates</h3>
                <p className="text-white/90 text-sm">
                  View and download your achievement certificates
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* My Events Tab */}
        {activeTab === 'registered' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock size={24} className="mr-2 text-primary-600" />
                Upcoming Events ({upcomingEvents.length})
              </h2>
              {upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming events registered</p>
                </div>
              )}
            </div>

            {/* Past Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle size={24} className="mr-2 text-green-600" />
                Past Events ({pastEvents.length})
              </h2>
              {pastEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download Certificate
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No past events</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-lg"
              >
                <Award size={32} className="mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">{achievementStats.total}</p>
                <p className="text-sm opacity-90">Total Certificates</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg"
              >
                <Trophy size={32} className="mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">{achievementStats.wins}</p>
                <p className="text-sm opacity-90">Wins</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-2xl p-6 shadow-lg"
              >
                <Award size={32} className="mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">{achievementStats.runnerUp}</p>
                <p className="text-sm opacity-90">Runner-up</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg"
              >
                <Award size={32} className="mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">{achievementStats.specialRecognition}</p>
                <p className="text-sm opacity-90">Special Recognition</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-6 shadow-lg"
              >
                <CheckCircle size={32} className="mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">{achievementStats.participation}</p>
                <p className="text-sm opacity-90">Participation</p>
              </motion.div>
            </div>

            {/* View Full Profile Button */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-700 dark:to-accent-700 rounded-2xl p-8 text-white text-center">
              <Shield size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Public Achievement Portfolio</h3>
              <p className="mb-6 opacity-90">Share your verified achievements with recruiters and HR professionals</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/profile/${currentUser.id}`)}
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <ExternalLink size={20} />
                View Public Profile
              </motion.button>
            </div>

            {/* Certificates List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Award size={24} className="mr-2 text-primary-600 dark:text-primary-400" />
                My Certificates ({certificates.length})
              </h2>

              {certificates.length > 0 ? (
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl text-white">
                            <Award size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-2 mb-2">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{cert.eventName}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                cert.achievementType === 'Winner' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  : cert.achievementType === 'Runner-up'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  : cert.achievementType === 'Special Recognition'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}>
                                {cert.achievementType}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cert.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(cert.eventDate).toLocaleDateString()}
                              </span>
                              {cert.position && (
                                <span className="font-semibold text-primary-600 dark:text-primary-400">
                                  • {cert.position}
                                </span>
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Student Login ID:</p>
                              <div className="flex items-center gap-2">
                                <code className="text-xs font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                  {cert.studentLoginId}
                                </code>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(cert.studentLoginId);
                                    alert('Login ID copied!');
                                  }}
                                  className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded transition-colors"
                                  title="Copy login ID"
                                >
                                  <Copy size={14} className="text-gray-500 dark:text-gray-400" />
                                </button>
                              </div>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Use with name for AI verification</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/verify')}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Shield size={16} />
                            AI Verify
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Download size={16} />
                            Download
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award size={64} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Certificates Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Participate in events to earn achievement certificates
                  </p>
                  <Button onClick={() => navigate('/events')}>
                    Browse Events
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-8 text-white relative">
                <div className="flex items-center space-x-6">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-24 h-24 rounded-full border-4 border-white/30"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-1">{currentUser.name}</h2>
                    <p className="text-white/90">{currentUser.email}</p>
                  </div>
                  <Button variant="secondary" icon={Edit}>
                    Edit Profile
                  </Button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Roll Number
                    </label>
                    <p className="text-gray-900">{currentUser.rollNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department
                    </label>
                    <p className="text-gray-900">{currentUser.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <p className="text-gray-900">{currentUser.year}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900">{currentUser.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  <p className="text-gray-700 leading-relaxed">{currentUser.bio}</p>
                </div>

                {/* Activity Stats */}
                <div className="pt-6 border-t">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Activity Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <p className="text-3xl font-bold text-primary-600">{registeredEvents.length}</p>
                      <p className="text-sm text-gray-600 mt-1">Total Events</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-3xl font-bold text-green-600">{pastEvents.length}</p>
                      <p className="text-sm text-gray-600 mt-1">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-accent-50 rounded-lg">
                      <p className="text-3xl font-bold text-accent-600">{upcomingEvents.length}</p>
                      <p className="text-sm text-gray-600 mt-1">Upcoming</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
