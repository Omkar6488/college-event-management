// Mock API functions simulating backend calls
// In production, replace these with actual axios API calls

import { events } from './events';
import { students, currentUser } from './users';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Events API
export const eventsAPI = {
  // Get all events
  getAllEvents: async () => {
    await delay();
    return { data: events, success: true };
  },

  // Get event by ID
  getEventById: async (id) => {
    await delay();
    const event = events.find(e => e.id === parseInt(id));
    return { data: event, success: !!event };
  },

  // Get featured events
  getFeaturedEvents: async () => {
    await delay();
    const featured = events.filter(e => e.featured);
    return { data: featured, success: true };
  },

  // Get events by category
  getEventsByCategory: async (category) => {
    await delay();
    const filtered = category === 'all' 
      ? events 
      : events.filter(e => e.category === category);
    return { data: filtered, success: true };
  },

  // Search events
  searchEvents: async (query) => {
    await delay();
    const filtered = events.filter(e => 
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filtered, success: true };
  },

  // Register for event
  registerForEvent: async (eventId, userId) => {
    await delay();
    // Simulate successful registration
    console.log(`User ${userId} registered for event ${eventId}`);
    return { success: true, message: 'Successfully registered for event!' };
  },

  // Create event (admin)
  createEvent: async (eventData) => {
    await delay();
    console.log('Creating event:', eventData);
    // In production, this would POST to backend
    return { success: true, message: 'Event created successfully!', data: eventData };
  },

  // Update event (admin)
  updateEvent: async (eventId, eventData) => {
    await delay();
    console.log(`Updating event ${eventId}:`, eventData);
    return { success: true, message: 'Event updated successfully!' };
  },

  // Delete event (admin)
  deleteEvent: async (eventId) => {
    await delay();
    console.log(`Deleting event ${eventId}`);
    return { success: true, message: 'Event deleted successfully!' };
  }
};

// User API
export const userAPI = {
  // Get current user
  getCurrentUser: async () => {
    await delay();
    return { data: currentUser, success: true };
  },

  // Get user's registered events
  getUserEvents: async (userId) => {
    await delay();
    const user = students.find(s => s.id === userId);
    const userEventIds = user?.registeredEvents || [];
    const userEvents = events.filter(e => userEventIds.includes(e.id));
    return { data: userEvents, success: true };
  },

  // Update user profile
  updateProfile: async (userId, profileData) => {
    await delay();
    console.log(`Updating profile for user ${userId}:`, profileData);
    return { success: true, message: 'Profile updated successfully!' };
  }
};

// Analytics API (for admin dashboard)
export const analyticsAPI = {
  getStats: async () => {
    await delay();
    return {
      data: {
        totalEvents: events.length,
        upcomingEvents: events.filter(e => e.status === 'upcoming').length,
        totalRegistrations: events.reduce((sum, e) => sum + e.registeredCount, 0),
        totalStudents: students.length,
        averageAttendance: 85,
        popularCategory: 'Technical'
      },
      success: true
    };
  }
};
