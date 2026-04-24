'use client';

import { useState } from 'react';

export default function RzutMoneta() {
  const [wynik, ustawWynik] = useState<'Orzeł' | 'Reszka' | null>(null);
  const [czyRzuca, ustawRzuca] = useState(false);
  const [rotacja, ustawRotacja] = useState(0);

  const rzut = () => {
    if (czyRzuca) return;

    ustawRzuca(true);
    ustawWynik(null);

    const los = Math.random() < 0.5 ? 'Orzeł' : 'Reszka';

    // 👉 klucz: parzyste = orzeł, nieparzyste = reszka
    const dodatkoweObroty =
      Math.floor(Math.random() * 4 + 4) * 360 +
      (los === 'Orzeł' ? 0 : 180);

    const finalRotation = rotacja + dodatkoweObroty;

    ustawRotacja(finalRotation);

    setTimeout(() => {
      ustawWynik(los);
      ustawRzuca(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">

      {/* MONETA */}
      <div
        className="relative w-32 h-32"
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className="w-full h-full transition-transform duration-1000"
          style={{
            transform: `rotateY(${rotacja}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ORZEŁ */}
          <img
            src="/orzel.png"
            className="absolute w-full h-full rounded-full backface-hidden"
          />

          {/* RESZKA */}
          <img
            src="/reszka.png"
            className="absolute w-full h-full rounded-full backface-hidden"
            style={{
              transform: 'rotateY(180deg)',
            }}
          />
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={rzut}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        RZUĆ MONETĄ
      </button>

    
    </div>
  );
}