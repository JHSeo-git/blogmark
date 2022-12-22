import type { AnimationProps } from 'framer-motion';

export const overlayDefault: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { ease: 'easeOut', duration: 0.15 } },
  exit: { opacity: 0, transition: { ease: 'easeIn', duration: 0.15 } },
};

export const contentDefault: AnimationProps = {
  initial: { opacity: 0, y: 50, x: '-50%' },
  animate: { opacity: 1, y: '-50%', x: '-50%' },
  exit: {
    opacity: 0,
    y: 50,
    x: '-50%',
    transition: { ease: 'easeIn', duration: 0.15 },
  },
};

export const contentScale: AnimationProps = {
  initial: { opacity: 0, scale: 0.9, y: '-50%', x: '-50%' },
  animate: { opacity: 1, scale: 1, y: '-50%', x: '-50%' },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: '-50%',
    x: '-50%',
    transition: { ease: 'easeIn', duration: 0.15 },
  },
};
