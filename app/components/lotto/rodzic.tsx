'use client';

import { useState } from 'react';

export default function Lotto() {
  const [wyniki, ustawWyniki] = useState<number[]>([]);
  const [czyLosuje, ustawLosuje] = useState(false);

  const losujLotto = () => {
    if (czyLosuje) return;

    ustawLosuje(true);
    ustawWyniki([]);

    const wszystkie = Array.from({ length: 49 }, (_, i) => i + 1);
    const wylosowane: number[] = [];

    let licznik = 0;

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * wszystkie.length);
      const liczba = wszystkie.splice(index, 1)[0];

      wylosowane.push(liczba);
      ustawWyniki([...wylosowane]);

      licznik++;

      if (licznik === 6) {
        clearInterval(interval);
        ustawLosuje(false);
      }
    }, 400);
  };

  const kulki = wyniki.length > 0 ? wyniki : Array(6).fill('?');

  return (
    <div className="flex flex-col items-center gap-8 mt-10">

      {/* KULKI */}
      <div className="flex gap-3">
        {kulki.map((num, i) => (
          <div
            key={i}
            className={`w-14 h-14 flex items-center justify-center rounded-full font-bold text-lg shadow-lg
              ${wyniki.length > 0 ? 'bg-yellow-400 text-black animate-bounce' : 'bg-gray-300 text-gray-500'}
            `}
            style={{
              animationDuration: '0.5s',
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={losujLotto}
        disabled={czyLosuje}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
      >
        {czyLosuje ? 'Losowanie...' : 'LOSUJ LOTTO'}
      </button>
    </div>
  );
}