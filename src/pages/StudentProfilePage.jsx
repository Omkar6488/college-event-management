import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, Calendar, Trophy, Sparkles, Download, Share2, Copy, CheckCircle, TrendingUp, Target, Star, Medal } from 'lucide-react';
import { students } from '../data/users';
import { getCertificatesByStudentId, getStudentAchievementStats } from '../data/certificates';

const StudentProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copiedInfo, setCopiedInfo] = useState(null);

  // Get student data (in real app, fetch from API)
  const student = students.find(s => s.id === parseInt(id)) || students[0];
  const certificates = getCertificatesByStudentId(student.id);
  const stats = getStudentAchievementStats(student.id);

  const copyStudentInfo = (cert) => {
    const info = `${cert.studentName} - ${cert.eventName} - ${cert.studentLoginId}`;
    navigator.clipboard.writeText(info);
    setCopiedInfo(cert.id);
    setTimeout(() => setCopiedInfo(null), 2000);
  };

  const shareProfile = () => {
    const url = `${window.location.origin}/profile/${student.id}`;
    navigator.clipboard.writeText(url);
    alert('Profile link copied to clipboard!');
  };

  const getAchievementColor = (type) => {
    const colors = {
      Winner: 'from-yellow-400 to-yellow-600',
      'Runner-up': 'from-blue-400 to-blue-600',
      'Special Recognition': 'from-purple-400 to-purple-600',
      Participation: 'from-green-400 to-green-600'
    };
    return colors[type] || 'from-gray-400 to-gray-600';
  };

  const getAchievementIcon = (type) => {
    const icons = {
      Winner: Trophy,
      'Runner-up': Medal,
      'Special Recognition': Star,
      Participation: Award
    };
    return icons[type] || Award;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 dark:from-primary-700 dark:via-accent-700 dark:to-purple-700 text-white py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 bg-white text-yellow-500 rounded-full p-2 shadow-lg"
              >
                <Sparkles size={24} />
              </motion.div>
            </motion.div>

            {/* Student Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{student.name}</h1>
              <p className="text-xl opacity-90 mb-4">{student.rollNumber} • {student.department}</p>
              <p className="text-lg opacity-80 mb-4">{student.year}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {stats.skills.slice(0, 5).map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
                {stats.skills.length > 5 && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    +{stats.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareProfile}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Share2 size={20} />
              Share Profile
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {[
            { label: 'Total Certificates', value: stats.total, icon: Award, color: 'from-blue-500 to-cyan-500' },
            { label: 'Wins', value: stats.wins, icon: Trophy, color: 'from-yellow-500 to-orange-500' },
            { label: 'Runner-up', value: stats.runnerUp, icon: Medal, color: 'from-gray-400 to-gray-600' },
            { label: 'Special Recognition', value: stats.specialRecognition, icon: Star, color: 'from-purple-500 to-pink-500' },
            { label: 'Participation', value: stats.participation, icon: Target, color: 'from-green-500 to-emerald-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg`}
            >
              <stat.icon size={32} className="mb-3 opacity-80" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Award className="text-primary-600 dark:text-primary-400" size={36} />
              Achievement Certificates
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              {certificates.length} {certificates.length === 1 ? 'Certificate' : 'Certificates'}
            </div>
          </div>

          {certificates.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
              <Award size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Certificates Yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Participate in events to earn certificates and showcase your achievements!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/events')}
                className="btn-primary"
              >
                Explore Events
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              {certificates.map((cert, index) => {
                const AchievementIcon = getAchievementIcon(cert.achievementType);
                
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Certificate Header */}
                    <div className={`bg-gradient-to-r ${getAchievementColor(cert.achievementType)} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                        <div className="w-full h-full bg-white/10 rounded-full" />
                      </div>
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
                          >
                            <AchievementIcon size={32} />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{cert.eventName}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold">
                                {cert.achievementType}
                              </span>
                              {cert.position && (
                                <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold">
                                  {cert.position}
                                </span>
                              )}
                              <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold">
                                {cert.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm opacity-90">
                              <span className="flex items-center gap-1">
                                <Calendar size={16} />
                                {new Date(cert.eventDate).toLocaleDateString('en-US', { 
                                  month: 'short', day: 'numeric', year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Body */}
                    <div className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-6">{cert.description}</p>

                      {/* Skills */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Skills Demonstrated:</p>
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Student Info for AI Verification */}
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Login ID for Verification</p>
                            <p className="font-mono font-bold text-gray-900 dark:text-white">{cert.studentLoginId}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use this with student name for AI verification</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyStudentInfo(cert)}
                            className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title="Copy verification details"
                          >
                            {copiedInfo === cert.id ? (
                              <CheckCircle size={20} className="text-green-600" />
                            ) : (
                              <Copy size={20} className="text-gray-600 dark:text-gray-300" />
                            )}
                          </motion.button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate('/verify')}
                          className="flex-1 min-w-[160px] bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          AI Verify Certificate
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 min-w-[160px] bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <Download size={18} />
                          Download
                        </motion.button>
                      </div>

                      {/* Issued By */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Issued by</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{cert.issuedBy}</p>
                          <p className="text-gray-600 dark:text-gray-400">{cert.designation}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 dark:text-gray-400">Certificate ID</p>
                          <p className="font-mono font-semibold text-gray-900 dark:text-white">{cert.id}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-700 dark:to-accent-700 rounded-2xl p-8 text-white text-center"
        >
          <TrendingUp size={48} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Keep Growing Your Achievements!</h3>
          <p className="mb-6 opacity-90">Participate in more events and build an impressive portfolio for your career</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/events')}
            className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Browse Upcoming Events
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
