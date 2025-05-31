import { useState, useEffect } from 'react';

const Cronometro = ({generarToken}) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos = 180 segundos

  useEffect(() => {
    if (timeLeft === 0) {
    generarToken()  
    };
      

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Convertir segundos a MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>      
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Cronometro;
