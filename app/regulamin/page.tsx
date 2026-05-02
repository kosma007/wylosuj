export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white space-y-6">

      <h1 className="text-2xl font-bold">
        Regulamin serwisu
      </h1>

      <p className="text-sm text-gray-400">
        Ostatnia aktualizacja: 02.05.2026
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1. Postanowienia ogólne</h2>
        <p>
          Niniejszy regulamin określa zasady korzystania ze strony internetowej,
          która oferuje losowania, generatory i inne narzędzia do zabawy.
          Korzystając ze strony, akceptujesz zasady opisane poniżej.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Charakter serwisu</h2>
        <p>
          Serwis ma charakter rozrywkowy i edukacyjny.
          Wyniki generowane przez stronę są losowe i nie mają żadnej gwarancji poprawności,
          sensu ani wpływu na rzeczywistość (niestety).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3. Odpowiedzialność</h2>
        <p>
          Administrator nie ponosi odpowiedzialności za decyzje podjęte
          na podstawie wyników losowań, generatorów lub innych funkcji strony.
          Jeśli przegrasz turniej — to nie nasza wina 😏
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">4. Zasady korzystania</h2>
        <p>
          Użytkownik zobowiązuje się korzystać ze strony zgodnie z prawem
          oraz w sposób niezakłócający jej działania.
          Zabrania się prób hackowania, spamowania lub psucia losowości (tak, serio).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">5. Dostępność serwisu</h2>
        <p>
          Staramy się, aby strona działała cały czas, ale nie gwarantujemy 100% uptime.
          Czasem coś się zepsuje, bo internet lubi dramaty.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">6. Zmiany regulaminu</h2>
        <p>
          Regulamin może być zmieniany bez wcześniejszego powiadomienia.
          Zaleca się jego okresowe sprawdzanie, jeśli masz aż tak dużo wolnego czasu.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">7. Kontakt</h2>
        <p>
          W razie pytań można skontaktować się przez dostępne kanały kontaktowe na stronie
          (jeśli takie istnieją, bo to zależy od humoru twórcy).
        </p>
      </section>

      <p className="text-xs text-gray-500 pt-6">
        Korzystanie ze strony oznacza akceptację faktu, że wynik losowania to tylko losowanie,
        a nie przeznaczenie wszechświata.
      </p>

    </div>
  );
}