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

    // mała animacja „udawania losowania”
    setTimeout(() => {
      const random =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

      ustawWynik(random);
      ustawLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">

      {/* INPUTY */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={min}
          onChange={(e) => ustawMin(e.target.value)}
          className="px-3 py-2 rounded-lg text-white border"
        />

        <input
          type="number"
          placeholder="Max"
          value={max}
          onChange={(e) => ustawMax(e.target.value)}
          className="px-3 py-2 rounded-lg text-white border"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={losuj}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? 'Losowanie...' : 'LOSUJ LICZBĘ'}
      </button>

      {/* WYNIK */}
      {wynik !== null && (
        <div className="text-2xl text-white font-bold">
          Wynik: {wynik}
        </div>
      )}
    </div>
  );
}