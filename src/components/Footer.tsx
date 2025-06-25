import React from 'react';
import { Brain, Twitter, Facebook, Instagram, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Solutions', href: '#services' },
        { name: 'Assessment', href: '#assessment' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Updates', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Community', href: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Contact', href: '#contact' },
        { name: 'Legal', href: '#' },
      ]
    }
  ];
  
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
  ];

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute opacity-10 -top-24 -right-20 w-80 h-80 rounded-full border-8 border-purple-500 dark:border-purple-800"></div>
        <div className="absolute opacity-10 -bottom-10 -left-20 w-60 h-60 rounded-full border-8 border-indigo-500 dark:border-indigo-800"></div>
        
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand and info */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-purple-400 dark:text-purple-500" />
                <span className="ml-2 text-xl font-bold text-white">AI Recruit</span>
              </div>
              <p className="mt-4 text-gray-400 dark:text-gray-300 text-sm max-w-md">
                Revolutionizing recruitment with artificial intelligence. Our platform uses advanced 
                algorithms to match candidates with the perfect roles.
              </p>
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((item) => (
                  <a 
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-200"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Links */}
            {footerLinks.map((section) => (
              <div key={section.title} className="col-span-1 md:col-span-1">
                <h3 className="text-sm font-semibold text-gray-200 dark:text-gray-100 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-purple-400 dark:hover:text-purple-300 transition-colors text-sm flex items-center"
                      >
                        {link.name}
                        {link.href.startsWith('http') && (
                          <ExternalLink className="ml-1 h-3 w-3" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Newsletter */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-200 dark:text-gray-100 tracking-wider uppercase">
                Subscribe
              </h3>
              <p className="mt-4 text-gray-400 dark:text-gray-300 text-sm">
                Get the latest news and updates
              </p>
              <form className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-md hover:shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 dark:text-gray-300">
              © {currentYear} AI Recruit. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-400 dark:text-gray-300">
              <a href="#" className="hover:text-purple-400 dark:hover:text-purple-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 dark:hover:text-purple-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 dark:hover:text-purple-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}