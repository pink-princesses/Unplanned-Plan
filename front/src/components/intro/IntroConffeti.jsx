import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getAnimationSettings() {
  return {
    particleCount: 3,
    startVelocity: 0,
    ticks: 200,
    gravity: 0.3,
    origin: {
      x: Math.random(),
      y: Math.random() * 0.999 - 0.2,
    },
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    scalar: randomInRange(0.4, 1),
  };
}

export default function Snow() {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  useEffect(() => {
    startAnimation();
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
}
