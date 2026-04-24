'use client';

import { useRef, useState, useEffect } from 'react';

export default function KoloFortuny() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [opcje, ustawOpcje] = useState<string[]>([
    'Pizza',
    'Kebab',
    'Burger',
    'Sushi',
  ]);

  const [nowaOpcja, ustawNowaOpcja] = useState('');
  const [kat, ustawKat] = useState(0);
  const [czyKreci, ustawKreci] = useState(false);
  const [wynik, ustawWynik] = useState<string | null>(null);

  const rysujKolo = (
    ctx: CanvasRenderingContext2D,
    dane: string[],
    rotacja: number
  ) => {
    const ilosc = dane.length;
    const katNaSekcje = (2 * Math.PI) / ilosc;

    ctx.clearRect(0, 0, 300, 300);

    dane.forEach((tekst, i) => {
      const start = i * katNaSekcje + rotacja;
      const koniec = start + katNaSekcje;

      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.arc(150, 150, 140, start, koniec);
      ctx.fillStyle = `hsl(${i * 60}, 70%, 50%)`;
      ctx.fill();

      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(start + katNaSekcje / 2);
      ctx.fillStyle = 'white';
      ctx.font = '14px sans-serif';
      ctx.fillText(tekst, 60, 5);
      ctx.restore();
    });
  };

  const losuj = () => {
    if (czyKreci || opcje.length < 2) return;

    ustawKreci(true);
    ustawWynik(null);

    let predkosc = Math.random() * 0.6 + 12.3;
    let rotacja = kat;

    const animacja = () => {
      rotacja += predkosc;
      predkosc *= 0.97;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      rysujKolo(ctx, opcje, rotacja);

      if (predkosc > 0.002) {
        requestAnimationFrame(animacja);
      } else {
        ustawKreci(false);
        ustawKat(rotacja);

       const poprawionaRotacja = rotacja + Math.PI / 2;

const index =
  opcje.length -
  Math.floor(
    ((poprawionaRotacja % (2 * Math.PI)) / (2 * Math.PI)) * opcje.length
  ) -
  1;

        ustawWynik(opcje[index]);
      }
    };

    animacja();
  };

  // 🔁 rysowanie po zmianie opcji
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    rysujKolo(ctx, opcje, kat);
  }, [opcje, kat]);

  // ➕ dodawanie
  const dodajOpcje = () => {
    if (!nowaOpcja.trim()) return;

    ustawOpcje([...opcje, nowaOpcja.trim()]);
    ustawNowaOpcja('');
  };

  // ❌ usuwanie
  const usunOpcje = (index: number) => {
    ustawOpcje(opcje.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center gap-6">

      {/* INPUT */}
      <div className="flex gap-2 bg-[#1E293B] rounded-xl mt-20 ">
        <input
          value={nowaOpcja}
          onChange={(e) => ustawNowaOpcja(e.target.value)}
          placeholder="Dodaj opcję..."
          className="px-4 py-2 rounded-xl text-white"
        />
        <button
          onClick={dodajOpcje}
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:opacity-50"
        >
          Dodaj
        </button>
      </div>

      {/* LISTA */}
      <div className="flex flex-wrap gap-2 max-w-md justify-center">
        {opcje.map((opcja, i) => (
          <div
            key={i}
            className="bg-slate-700 text-white px-3 py-1 rounded-lg flex items-center gap-2"
          >
            {opcja}
            <button onClick={() => usunOpcje(i)}>✕</button>
          </div>
        ))}
      </div>

<div className="relative">

  {/* 🔻 STRZAŁKA */}
  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
    <div className="w-0 h-0 
      border-l-[12px] border-l-transparent
      border-r-[12px] border-r-transparent
      border-t-[20px] border-black"
    />
  </div>

  {/* 🎡 KOŁO */}
  <canvas
    ref={canvasRef}
    width={300}
    height={300}
    className="rounded-full"
  />

</div>

      {/* BUTTON */}
      <button
        onClick={losuj}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        LOSUJ
      </button>

      {/* WYNIK */}
      {wynik && (
        <div className="text-xl text-white font-bold">
          Wynik: {wynik}
        </div>
      )}
    </div>
  );
}