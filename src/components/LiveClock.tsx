import { useEffect, useState } from 'react';

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatWithZeros = (n: number) => n.toString().padStart(2, '0');

  // "HH:MM:SS" with blinking separator or standard
  const hours = formatWithZeros(time.getHours());
  const minutes = formatWithZeros(time.getMinutes());
  const seconds = formatWithZeros(time.getSeconds());

  return (
    <div className="flex flex-col items-end">
      <div className="text-3xl font-bold tracking-tighter tabular-nums flex items-center">
        {hours}
        <span className="text-ink/50 mx-1">:</span>
        {minutes}
        <span className="text-ink/50 mx-1 text-2xl">:</span>
        <span className="text-2xl">{seconds}</span>
      </div>
      <div className="text-xs uppercase tracking-widest text-ink/70 font-sans font-semibold mt-1">
        {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </div>
  );
}
