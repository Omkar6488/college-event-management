import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, Award, Calendar, User, Hash, Shield, Download, Share2, Sparkles, Brain, Zap } from 'lucide-react';
import { verifyCertificateByDetails } from '../data/certificates';

const CertificateVerificationPage = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    eventName: '',
    eventDate: '',
    rollNumber: '',
    loginId: ''
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulate AI processing
    setTimeout(() => {
      const result = verifyCertificateByDetails(formData);
      setVerificationResult(result);
      setIsVerifying(false);
    }, 1500);
  };

  const handleDownloadCertificate = (cert) => {
    alert(`Download feature will be implemented with backend for ${cert.id}`);
  };

  const handleShareCertificate = (cert) => {
    const shareText = `Verified Certificate: ${cert.eventName} - ${cert.studentName} (${cert.achievementType})`;
    navigator.clipboard.writeText(shareText);
    alert('Certificate details copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 pt-20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <Brain size={64} className="text-primary-600 dark:text-primary-400" />
              <motion.div
                animate={{ scale: [0, 1.2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">AI-Powered</span> Certificate Verification
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced AI system verifies certificates by matching details against our secure database.
            No verification codes needed - just provide the certificate information.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="text-yellow-500" size={16} />
              <span>Instant Verification</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Brain className="text-purple-500" size={16} />
              <span>AI-Powered Matching</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="text-green-500" size={16} />
              <span>100% Secure</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl"
              >
                <Award className="text-white" size={28} />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Certificate Details</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fill in at least 2 fields for verification</p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Student Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                </div>

                {/* Event Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Name
                  </label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleInputChange}
                      placeholder="Enter event name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Roll Number (Optional)
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      placeholder="CS2024001"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                </div>

                {/* Student Login ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Student Login ID (Optional)
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleInputChange}
                      placeholder="STU2024001"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                </div>

                {/* Event Date */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isVerifying || (!formData.studentName && !formData.eventName && !formData.loginId)}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                {isVerifying ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain size={24} />
                    </motion.div>
                    <span className="relative z-10">AI Analyzing Certificate...</span>
                  </>
                ) : (
                  <>
                    <Search size={24} className="relative z-10" />
                    <span className="relative z-10">Verify Certificate with AI</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Sample Data Helper */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Try these sample details:</p>
              <div className="grid md:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, studentName: 'John Doe', eventName: 'Tech Fest' })}
                  className="text-left bg-white dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <strong>John Doe</strong> - Annual Tech Fest 2026
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, studentName: 'Jane Smith', rollNumber: 'EC2024045' })}
                  className="text-left bg-white dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <strong>Jane Smith</strong> - Roll: EC2024045
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, loginId: 'STU2024001', eventName: 'Workshop' })}
                  className="text-left bg-white dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <strong>LoginID:</strong> STU2024001 - Workshop
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, studentName: 'Jane Smith', eventName: 'Sports Meet' })}
                  className="text-left bg-white dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <strong>Jane Smith</strong> - Sports Meet
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification Results */}
        <AnimatePresence mode="wait">
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="max-w-4xl mx-auto mt-8"
            >
              {verificationResult.valid && verificationResult.certificates.length > 0 ? (
                <div className="space-y-6">
                  {/* Success Header */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-500 dark:border-green-400">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">{verificationResult.message}</h3>
                        <p className="text-green-700 dark:text-green-300">AI matched {verificationResult.certificates.length} certificate(s)</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Cards */}
                  {verificationResult.certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700"
                    >
                      {/* Certificate Header */}
                      <div className={`bg-gradient-to-r ${
                        cert.achievementType === 'Winner' ? 'from-yellow-400 to-orange-500' :
                        cert.achievementType === 'Runner-up' ? 'from-blue-400 to-blue-600' :
                        cert.achievementType === 'Special Recognition' ? 'from-purple-400 to-pink-500' :
                        'from-green-400 to-green-600'
                      } p-6 text-white relative overflow-hidden`}>
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
                              <Award size={32} />
                            </motion.div>
                            <div>
                              <h4 className="text-2xl font-bold mb-2">{cert.eventName}</h4>
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
                            </div>
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Sparkles size={32} />
                          </motion.div>
                        </div>
                      </div>

                      {/* Certificate Body */}
                      <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <User size={20} className="text-primary-600 dark:text-primary-400" />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Student Name</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{cert.studentName}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Hash size={20} className="text-primary-600 dark:text-primary-400" />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{cert.studentRollNumber}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Shield size={20} className="text-primary-600 dark:text-primary-400" />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Student Login ID</p>
                                <p className="font-semibold text-gray-900 dark:text-white font-mono">{cert.studentLoginId}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Calendar size={20} className="text-primary-600 dark:text-primary-400" />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Event Date</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {new Date(cert.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Certificate ID</p>
                              <p className="font-semibold text-gray-900 dark:text-white font-mono">{cert.id}</p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Issued Date</p>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {new Date(cert.issuedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300">{cert.description}</p>
                        </div>

                        {/* Skills */}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="mb-6">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills Demonstrated:</p>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Issuer Info */}
                        <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-600 mb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Issued By</p>
                              <p className="font-semibold text-gray-900 dark:text-white">{cert.issuedBy}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.designation}</p>
                            </div>
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full"
                            >
                              <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                            </motion.div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownloadCertificate(cert)}
                            className="flex-1 min-w-[200px] bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Download size={20} />
                            Download Certificate
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleShareCertificate(cert)}
                            className="flex-1 min-w-[200px] bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Share2 size={20} />
                            Share Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-red-500 dark:border-red-400">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <XCircle size={48} className="text-red-600 dark:text-red-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-red-900 dark:text-red-100">No Match Found</h3>
                      <p className="text-red-700 dark:text-red-300">{verificationResult.message}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">AI Analysis:</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>The certificate details provided don't match any records in our database</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Please verify the student name and event name spelling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Try adding additional details like roll number or login ID for better accuracy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>The certificate may not have been issued yet or may not exist</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Brain, title: "AI-Powered", description: "Advanced matching algorithms", color: "from-purple-500 to-pink-500" },
            { icon: Zap, title: "Instant Results", description: "Real-time verification", color: "from-yellow-500 to-orange-500" },
            { icon: Shield, title: "100% Secure", description: "Encrypted database", color: "from-green-500 to-emerald-500" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center`}>
                <item.icon className="text-white" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;
