'use client';

import { useState } from 'react';

export default function LosowanieLiczb() {
  const [min, ustawMin] = useState('');
  const [max, ustawMax] = useState('');
  const [wynik, ustawWynik] = useState<number | null>(null);
  const [loading, ustawLoading] = useState(false);

  const losuj = () => {
    const minNum = Number(min);
    const maxNum = Number(max);

    if (isNaN(minNum) || isNaN(maxNum)) return;
    if (minNum > maxNum) return;

    ustawLoading(true);
    ustawWynik(null);

    setTimeout(() => {
      const random =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

      ustawWynik(random);
      ustawLoading(false);
    }, 500);
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 gap-4 px-4">

      {/* INPUTY */}
      <div className="w-full max-w-xs flex flex-col gap-3">

        <input
          type="number"
          placeholder="Min"
          value={min}
          onChange={(e) => ustawMin(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border text-white bg-slate-800 focus:outline-none"
        />

        <input
          type="number"
          placeholder="Max"
          value={max}
          onChange={(e) => ustawMax(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border text-white bg-slate-800 focus:outline-none"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={losuj}
        disabled={loading}
        className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? 'Losowanie...' : 'LOSUJ LICZBĘ'}
      </button>

      {/* WYNIK */}
      {wynik !== null && (
        <div className="text-2xl font-bold text-white">
          🎲 {wynik}
        </div>
      )}

    </div>
  );
}