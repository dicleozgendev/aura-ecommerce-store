import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="announcement-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Zap size={16} fill="currentColor" />
        <span>LIMITED DEAL: <strong>FREE SAME-DAY EXPRESS SHIPPING</strong> & 14-Day Money Back Guarantee</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Clock size={15} />
        <span>Ends In:</span>
        <span className="countdown-timer">
          {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
}
