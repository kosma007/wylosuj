'use client';

import Link from 'next/link';

export default function Stopka() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        
        {/* LOGO / OPIS */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">Losuj.pl</h2>
          <p className="text-sm">
            Narzędzia do losowania, decyzji i zabawy. Prosto, szybko i bez zbędnego kombinowania.
          </p>
        </div>

        {/* NAWIGACJA */}
        <div>
          <h3 className="text-white font-semibold mb-3">Nawigacja</h3>
          <ul className="flex flex-col gap-2 text-sm">
                      <Link href="/moneta">Rzut monetą</Link>
          <Link href="/kostka">Kostka</Link>
          <Link href="/lotto">Lotto</Link>
        <Link href="/losowanie">Losowanie liczby</Link>
                <Link href="/drabinka">Drabinka drużynowa</Link>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h3 className="text-white font-semibold mb-3">Informacje</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/polityka-prywatnosci">Polityka prywatności</Link></li>
            <li><Link href="/regulamin">Regulamin</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </div>

      </div>

      {/* DÓŁ */}
      <div className="border-t border-slate-700 text-center text-sm py-4">
        © {new Date().getFullYear()} Losuj.pl — Wszelkie prawa zastrzeżone
      </div>
    </footer>
  );
}