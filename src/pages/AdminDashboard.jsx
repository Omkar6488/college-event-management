import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  TrendingUp,
  Award,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download
} from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { events, categories } from '../data/events';
import { currentAdmin } from '../data/users';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [allEvents, setAllEvents] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    date: '',
    endDate: '',
    time: '',
    venue: '',
    category: 'Technical',
    maxParticipants: '',
    organizer: currentAdmin.name,
    organizerEmail: currentAdmin.email,
    image: ''
  });

  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalRegistrations: events.reduce((sum, e) => sum + e.registeredCount, 0),
    averageAttendance: Math.round(
      (events.reduce((sum, e) => sum + (e.registeredCount / e.maxParticipants) * 100, 0) / events.length)
    )
  };

  useEffect(() => {
    filterEvents();
  }, [searchQuery]);

  const filterEvents = () => {
    if (!searchQuery) {
      setFilteredEvents(allEvents);
      return;
    }
    const filtered = allEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log('Creating event:', formData);
    // In production, this would call the API
    setShowCreateModal(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      date: '',
      endDate: '',
      time: '',
      venue: '',
      category: 'Technical',
      maxParticipants: '',
      organizer: currentAdmin.name,
      organizerEmail: currentAdmin.email,
      image: ''
    });
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log('Deleting event:', selectedEvent.id);
    // In production, this would call the API
    setShowDeleteConfirm(false);
    setSelectedEvent(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'events', label: 'Manage Events', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: Award }
  ];

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
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-white/90">Manage college events and view analytics</p>
              </div>
              <Button
                variant="secondary"
                icon={Plus}
                onClick={() => setShowCreateModal(true)}
              >
                Create Event
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 font-semibold'
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
                title="Total Events"
                value={stats.totalEvents}
                icon={Calendar}
                color="primary"
                trend="up"
                trendValue="+12%"
              />
              <StatsCard
                title="Upcoming Events"
                value={stats.upcomingEvents}
                icon={TrendingUp}
                color="accent"
              />
              <StatsCard
                title="Total Registrations"
                value={stats.totalRegistrations}
                icon={Users}
                color="success"
                trend="up"
                trendValue="+24%"
              />
              <StatsCard
                title="Avg. Attendance"
                value={`${stats.averageAttendance}%`}
                icon={Award}
                color="warning"
                trend="up"
                trendValue="+5%"
              />
            </div>

            {/* Recent Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Events</h2>
                <button
                  onClick={() => setActiveTab('events')}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Registrations
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {allEvents.slice(0, 5).map(event => (
                      <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                            />
                            <span className="font-medium text-gray-900 dark:text-white">{event.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {event.registeredCount} / {event.maxParticipants}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.status === 'upcoming'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-6 cursor-pointer"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Create New Event</h3>
                <p className="text-white/90 text-sm">
                  Add a new event to the calendar
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-xl p-6 cursor-pointer"
                onClick={() => setActiveTab('events')}
              >
                <Edit size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Manage Events</h3>
                <p className="text-white/90 text-sm">
                  Edit or delete existing events
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 cursor-pointer"
                onClick={() => setActiveTab('analytics')}
              >
                <Download size={32} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">Export Reports</h3>
                <p className="text-white/90 text-sm">
                  Download event analytics and reports
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Manage Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <Button icon={Filter} variant="outline">
                  Filter
                </Button>
                <Button icon={Plus} onClick={() => setShowCreateModal(true)}>
                  Create Event
                </Button>
              </div>

              {/* Events Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Venue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Registrations
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEvents.map(event => (
                      <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{event.organizer}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {event.venue}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-1 mr-2">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {event.registeredCount}/{event.maxParticipants}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => navigate(`/events/${event.id}`)}
                              className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Analytics</h2>
              
              {/* Category Distribution */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
                <div className="space-y-3">
                  {categories.filter(c => c.value !== 'all').map(category => {
                    const count = events.filter(e => e.category === category.value).length;
                    const percentage = (count / events.length) * 100;
                    return (
                      <div key={category.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-700">{category.name}</span>
                          <span className="font-semibold text-gray-900">{count} events</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`${category.color} h-3 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Events */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Events</h3>
                <div className="space-y-3">
                  {[...events]
                    .sort((a, b) => b.registeredCount - a.registeredCount)
                    .slice(0, 5)
                    .map((event, index) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="font-bold text-2xl text-gray-300 mr-4">#{index + 1}</span>
                          <div>
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-600">{event.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary-600">{event.registeredCount}</p>
                          <p className="text-sm text-gray-600">registrations</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <Modal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            title="Create New Event"
            size="lg"
          >
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    {categories.filter(c => c.value !== 'all').map(cat => (
                      <option key={cat.id} value={cat.value}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Participants *
                  </label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-field"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  className="input-field"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Event
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedEvent && (
          <Modal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            title="Confirm Delete"
            size="sm"
          >
            <div className="text-center py-4">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Delete "{selectedEvent.title}"?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. All registrations will be lost.
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmDelete}
                >
                  Delete Event
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
