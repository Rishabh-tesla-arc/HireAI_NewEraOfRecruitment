import { Variants } from 'framer-motion';

// Staggered children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade up animation - good for sections and cards
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200
    }
  },
};

// Fade in animation - subtle for text
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
};

// Scale animation - good for buttons and interactive elements
export const scaleAnimation: Variants = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 },
};

// Slide in from left animation
export const slideInLeft: Variants = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  },
};

// Slide in from right animation
export const slideInRight: Variants = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  },
};

// For staggered list items
export const listItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200
    }
  },
};

// For animating the active/visible elements on scroll
export const scrollAnimation: Variants = {
  hidden: { 
    opacity: 0,
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}; 