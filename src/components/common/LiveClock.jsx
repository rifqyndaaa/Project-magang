import { useState, useEffect } from 'react';
import Icon from './Icon';

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function LiveClock({ variant = 'topbar', showGreeting = false }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dayName = HARI[now.getDay()];
  const dateNum = now.getDate();
  const monthName = BULAN[now.getMonth()];
  const yearNum = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Ucapan salam waktu Indonesia
  const getGreeting = () => {
    const currentHour = now.getHours();
    if (currentHour >= 4 && currentHour < 11) return 'Selamat Pagi';
    if (currentHour >= 11 && currentHour < 15) return 'Selamat Siang';
    if (currentHour >= 15 && currentHour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  if (variant === 'simple-date') {
    return (
      <span className="gov-live-simple-date">
        {dayName}, {dateNum} {monthName} {yearNum}
      </span>
    );
  }

  if (variant === 'hero-badge') {
    return (
      <div className="gov-hero-clock-badge" aria-label="Waktu Server Real-time">
        <span className="gov-live-pulse-dot" aria-hidden="true" />
        <span className="gov-hero-clock-date">
          {dayName}, {dateNum} {monthName} {yearNum}
        </span>
        <span className="gov-hero-clock-separator" aria-hidden="true">•</span>
        <span className="gov-hero-clock-time">
          <Icon name="clock" size={14} color="#38BDF8" />
          <strong>{hours}:{minutes}:{seconds}</strong> WIB
        </span>
      </div>
    );
  }

  // Default: variant === 'topbar'
  return (
    <div className="gov-topbar-clock" aria-label="Penunjuk Waktu Resmi Provinsi Riau">
      <span className="gov-live-pulse-dot" aria-hidden="true" />
      {showGreeting && (
        <span className="gov-clock-greeting">{getGreeting()}, </span>
      )}
      <span className="gov-clock-date">
        {dayName}, {dateNum} {monthName} {yearNum}
      </span>
      <span className="gov-clock-divider" aria-hidden="true">|</span>
      <span className="gov-clock-time">
        <Icon name="clock" size={13} color="currentColor" />
        <span>{hours}:{minutes}:{seconds} WIB</span>
      </span>
    </div>
  );
}

