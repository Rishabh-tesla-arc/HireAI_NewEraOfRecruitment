import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import ScrollAnimator from './ScrollAnimator';

// Fix for default marker icons in react-leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  
  // KIIT University coordinates
  const position: [number, number] = [20.35363681141322, 85.81931460117369];
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      try {
        // Initialize map
        const map = L.map(mapRef.current).setView(position, 15);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add marker
        L.marker(position)
          .addTo(map)
          .bindPopup("Kalinga Institute of Industrial Technology (KIIT)<br>Patia, Bhubaneswar, Odisha, India")
          .openPopup();
        
        mapInstanceRef.current = map;
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    }
    
    // Cleanup function to destroy map when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.error("Error cleaning up map:", error);
        }
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setFormError('Please fill out all required fields');
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div id="contact" className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Get in Touch
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions about our AI recruitment solution? We're here to help.
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollAnimator animation="slideLeft">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transform transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
                Send us a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Your message here..."
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="flex items-center text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{formError}</span>
                  </div>
                )}
                
                {formStatus === 'success' && (
                  <div className="flex items-center text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Your message has been sent successfully!</span>
                  </div>
                )}
                
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </ScrollAnimator>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <ScrollAnimator animation="slideRight">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">Our Address</h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                      Kalinga Institute of Industrial Technology (KIIT) 
                      deemed to be University Patia, Bhubaneswar, Odisha, India Pin: 751024<br />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">Email</h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        <a href="mailto:hello@airecruit.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          hello@airecruit.com
                        </a>
                      </p>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        <a href="mailto:support@airecruit.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          support@airecruit.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">Phone</h4>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        <a href="tel:+14151234567" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          (+91) 9876543210
                        </a>
                      </p>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        <a href="tel:+18001234567" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          (+91) 9876543210 (Toll-free)
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimator>
            
            {/* Interactive Map */}
            <ScrollAnimator animation="fadeUp">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-64 relative">
                <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </div>
    </div>
  );
} 