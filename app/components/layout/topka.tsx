'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TopMenu() {
  const [czyOtwarte, ustawOtwarte] = useState(false);

  return (
    <nav className="w-full bg-[#1E293B] text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between ">
        
        {/* LOGO */}
        <div className="text-xl font-bold">
          <Link href="/">Wylosuj.pl</Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6">
          <Link href="/moneta">Rzut monetą</Link>
          <Link href="/kostka">Kostka</Link>
          <Link href="/lotto">Lotto</Link>
        <Link href="/losowanie">Losowanie liczby</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => ustawOtwarte(!czyOtwarte)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {czyOtwarte && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
                  <Link href="/moneta">Rzut monetą</Link>
          <Link href="/kostka">Kostka</Link>
          <Link href="/kolo-fortuny">Koło fortuny</Link>
        <Link href="/losowanie">Losowanie liczby</Link>
        </div>
      )}
    </nav>
  );
}