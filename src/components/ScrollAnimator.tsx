import React, { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollAnimatorProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight';
}

export default function ScrollAnimator({
  children,
  delay = 0,
  threshold = 0.1,
  className = '',
  animation = 'fadeUp',
}: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  // Simplified animation variants
  const getVariants = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.4, delay }
          }
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, delay }
          }
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, delay }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay }
          }
        };
    }
  };

  // Use try-catch to handle any potential errors
  try {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
        className={className}
      >
        {children}
      </motion.div>
    );
  } catch (error) {
    console.error("Error in ScrollAnimator:", error);
    // Fallback to rendering children directly without animation
    return <div className={className}>{children}</div>;
  }
} 