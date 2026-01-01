import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [celebrating, setCelebrating] = useState(false);
  const girlfriendName = "Priya"; // CHANGE TO HER NAME!

  useEffect(() => {
    const target = new Date('2026-01-01T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setCelebrating(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const createFireworks = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const fw = document.createElement('div');
        fw.className = 'firework';
        fw.style.left = Math.random() * 100 + 'vw';
        fw.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(fw);
        setTimeout(() => fw.remove(), 5000);
      }, i * 200);
    }
  };

  return (
    <div className="app">
      <div className="stars"></div>
      <div className="moon"></div>
      {!celebrating ? (
        <div className="countdown">
          <h1>Happy New Year, {girlfriendName}! 💕</h1>
          <div className="time-grid">
            <div className="time-box"><span>{timeLeft.days?.toString().padStart(2, '0')}</span><p>Days</p></div>
            <div className="time-box"><span>{timeLeft.hours?.toString().padStart(2, '0')}</span><p>Hours</p></div>
            <div className="time-box"><span>{timeLeft.mins?.toString().padStart(2, '0')}</span><p>Mins</p></div>
            <div className="time-box"><span>{timeLeft.secs?.toString().padStart(2, '0')}</span><p>Secs</p></div>
          </div>
          <p>Till our 2026 adventure begins ✨</p>
        </div>
      ) : (
        <div className="celebration">
          <h1 className="newyear-title">Happy New Year 2026, {girlfriendName}! 🎉</h1>
          <p className="love-msg">You're my forever fireworks! Let's make magic together 💖</p>
          <button onClick={createFireworks} className="party-btn">Launch Fireworks! 🎆</button>
        </div>
      )}
    </div>
  );
}

export default App;
