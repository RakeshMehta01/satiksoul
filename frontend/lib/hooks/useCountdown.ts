'use client';
import { useState, useEffect } from 'react';

export interface Countdown {
  days: number; hours: number; minutes: number; seconds: number; isExpired: boolean;
}

export function useCountdown(targetDate: string | Date): Countdown {
  const target = new Date(targetDate).getTime();

  const calc = (): Countdown => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      isExpired: false,
    };
  };

  const [state, setState] = useState<Countdown>(calc);
  useEffect(() => {
    const id = setInterval(() => setState(calc()), 1000);
    return () => clearInterval(id);
  }, [target]); // eslint-disable-line

  return state;
}
