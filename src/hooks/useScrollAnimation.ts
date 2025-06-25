import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface UseScrollAnimationProps {
  threshold?: number;
  once?: boolean;
}

/**
 * Custom hook for triggering animations when elements come into view while scrolling
 * 
 * @param threshold - The amount of the element that needs to be visible to trigger the animation (0-1)
 * @param once - Whether the animation should only happen once
 * @returns Object containing the ref to attach to the element and the animation controls
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  once = true,
}: UseScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold,
    once
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return { ref, controls, inView };
};

export default useScrollAnimation; 