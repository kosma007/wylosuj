'use client';

import { useState } from 'react';

export default function Kostka() {
  const [wynik, ustawWynik] = useState<number | null>(null);
  const [czyRzuca, ustawRzuca] = useState(false);
  const [rotX, ustawRotX] = useState(0);
  const [rotY, ustawRotY] = useState(0);

  const rzut = () => {
    if (czyRzuca) return;

    ustawRzuca(true);
    ustawWynik(null);

    const los = Math.floor(Math.random() * 6) + 1;

    // 🔥 KAŻDY WYNIK JEST NA PRZODZIE
    const mapowanie: Record<number, { x: number; y: number }> = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: -90 },
      3: { x: 90, y: 0 },
      4: { x: -90, y: 0 },
      5: { x: 0, y: 90 },
      6: { x: 180, y: 0 },
    };

    const spinX = 360 * (Math.floor(Math.random() * 3) + 3);
    const spinY = 360 * (Math.floor(Math.random() * 3) + 3);

    ustawRotX(spinX + mapowanie[los].x);
    ustawRotY(spinY + mapowanie[los].y);

    setTimeout(() => {
      ustawWynik(los);
      ustawRzuca(false);
    }, 1000);
  };

  const Kropka = (x: number, y: number) => (
    <div
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        background: 'black',
        borderRadius: '50%',
        top: `${y}%`,
        left: `${x}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );

  const renderFace = (num: number) => {
    switch (num) {
      case 1:
        return <>{Kropka(50, 50)}</>;
      case 2:
        return <>{Kropka(25, 25)}{Kropka(75, 75)}</>;
      case 3:
        return <>{Kropka(25, 25)}{Kropka(50, 50)}{Kropka(75, 75)}</>;
      case 4:
        return <>{Kropka(25, 25)}{Kropka(75, 25)}{Kropka(25, 75)}{Kropka(75, 75)}</>;
      case 5:
        return <>{Kropka(25, 25)}{Kropka(75, 25)}{Kropka(50, 50)}{Kropka(25, 75)}{Kropka(75, 75)}</>;
      case 6:
        return (
          <>
            {Kropka(25, 25)}{Kropka(75, 25)}
            {Kropka(25, 50)}{Kropka(75, 50)}
            {Kropka(25, 75)}{Kropka(75, 75)}
          </>
        );
    }
  };

  const faceStyle = (transform: string): React.CSSProperties => ({
    position: 'absolute',
    width: '96px',
    height: '96px',
    background: 'white',
    border: '2px solid black',
    borderRadius: '16px',
    transform,
  });

  return (
    <div className="flex flex-col items-center gap-6 mt-10">

      {/* 🎲 KOSTKA */}
      <div style={{ perspective: '800px' }}>
        <div
          style={{
            width: '96px',
            height: '96px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: 'transform 1s ease-out',
          }}
        >
          {/* FRONT */}
          <div style={faceStyle('translateZ(48px)')}>
            {renderFace(1)}
          </div>

          {/* BACK */}
          <div style={faceStyle('rotateY(180deg) translateZ(48px)')}>
            {renderFace(6)}
          </div>

          {/* RIGHT */}
          <div style={faceStyle('rotateY(90deg) translateZ(48px)')}>
            {renderFace(2)}
          </div>

          {/* LEFT */}
          <div style={faceStyle('rotateY(-90deg) translateZ(48px)')}>
            {renderFace(5)}
          </div>

          {/* TOP */}
          <div style={faceStyle('rotateX(-90deg) translateZ(48px)')}>
            {renderFace(3)}
          </div>

          {/* BOTTOM */}
          <div style={faceStyle('rotateX(90deg) translateZ(48px)')}>
            {renderFace(4)}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={rzut}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        RZUĆ KOSTKĄ
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