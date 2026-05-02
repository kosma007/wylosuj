"use client";
import { useState } from "react";

type Match = {
  id: string;
  team1: string;
  team2: string | null;
  winner?: string;
};

export default function TournamentBracket() {
  const sizes = [2, 4, 8, 12, 16];

  const [teamsCount, setTeamsCount] = useState(8);
  const [setupTeams, setSetupTeams] = useState<string[]>(
    Array(8).fill("")
  );

  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<Match[][]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const changeSize = (size: number) => {
    setTeamsCount(size);
    setSetupTeams(Array(size).fill(""));
    setRounds([]);
    setStarted(false);
    setWinner(null);
  };

  const updateSetup = (i: number, value: string) => {
    const copy = [...setupTeams];
    copy[i] = value;
    setSetupTeams(copy);
  };

  const shuffle = (arr: string[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const buildTree = (teams: string[]) => {
    let current = teams;
    const all: Match[][] = [];

    while (current.length > 1) {
      const round: Match[] = [];

      for (let i = 0; i < current.length; i += 2) {
        round.push({
          id: `${all.length}-${i}`,
          team1: current[i],
          team2: current[i + 1] ?? null,
        });
      }

      all.push(round);
      current = round.map(() => "");
    }

    return all;
  };

  const start = () => {
    let teams = setupTeams.map((t, i) => t || `Drużyna ${i + 1}`);
    teams = shuffle(teams);

    setRounds(buildTree(teams));
    setStarted(true);
  };

  const updateTeam = (
    r: number,
    m: number,
    field: "team1" | "team2",
    value: string
  ) => {
    const copy = [...rounds];
    copy[r][m][field] = value;
    setRounds(copy);
  };

  const pickWinner = (r: number, m: number, selected: string) => {
    const copy = [...rounds];
    const match = copy[r][m];

    const oldWinner = match.winner;
    match.winner = selected;

    if (oldWinner && oldWinner !== selected) {
      for (let i = r + 1; i < copy.length; i++) {
        copy[i].forEach((mm) => {
          if (mm.team1 === oldWinner) mm.team1 = "";
          if (mm.team2 === oldWinner) mm.team2 = "";
        });
      }
    }

    const next = copy[r + 1];
    if (next) {
      const idx = Math.floor(m / 2);

      if (!next[idx].team1) next[idx].team1 = selected;
      else next[idx].team2 = selected;
    }

    setRounds(copy);

    const isFinal =
      r === rounds.length - 1 &&
      rounds[r].length === 1;

    if (isFinal) setWinner(selected);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto ">

      <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
        Turniej
      </h1>

      {winner && (
        <div className="mb-4 p-3 bg-yellow-100 border rounded text-center font-bold">
          🏆 ZWYCIĘZCA: {winner}
        </div>
      )}

      {/* SETUP */}
      {!started && (
        <>
          <div className="flex gap-2 mb-4 flex-wrap">
            {sizes.map((n) => (
              <button
                key={n}
                onClick={() => changeSize(n)}
                className={`px-3 py-1 border rounded text-white ${
                  teamsCount === n ? "bg-green-500 text-black" : ""
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white mb-4">
            {setupTeams.map((t, i) => (
              <input
                key={i}
                value={t}
                onChange={(e) => updateSetup(i, e.target.value)}
                className="border p-2 rounded"
                placeholder={`Drużyna ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={start}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Start turnieju
          </button>
        </>
      )}

      {/* BRACKET */}
      {started && (
        <div className="mt-6 md:mt-10 overflow-x-auto">

          <div className="flex justify-start md:justify-center gap-10 md:gap-20 min-w-max px-2">

            {rounds.map((round, rIndex) => (
              <div
                key={rIndex}
                className="flex flex-col items-center min-w-[180px] md:min-w-[240px]"
              >
                <h2 className="text-center text-white font-bold mb-4">
                  Runda {rIndex + 1}
                </h2>

                <div className="flex flex-col justify-center items-center gap-6">

                  {round.map((m, mIndex) => (
                    <div
                      key={m.id}
                      className="border p-3 rounded w-[160px] md:w-[240px] bg-[#1E293B] text-white text-center shadow"
                    >

                      {/* TEAM 1 */}
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          value={m.team1 || ""}
                          onChange={(e) =>
                            updateTeam(rIndex, mIndex, "team1", e.target.value)
                          }
                          className="border p-1 w-full text-white text-center text-xs md:text-sm"
                        />

                        <input
                          type="checkbox"
                          checked={m.winner === m.team1 && !!m.team1}
                          onChange={() => pickWinner(rIndex, mIndex, m.team1)}
                          className="w-4 h-4 accent-green-500"
                        />
                      </div>

                      <div className="text-gray-400 text-xs">vs</div>

                      {/* TEAM 2 */}
                      {m.team2 !== null ? (
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            value={m.team2 || ""}
                            onChange={(e) =>
                              updateTeam(rIndex, mIndex, "team2", e.target.value)
                            }
                            className="border p-1 w-full text-white text-center text-xs md:text-sm"
                          />

                          <input
                            type="checkbox"
                            checked={m.winner === m.team2}
                            onChange={() => pickWinner(rIndex, mIndex, m.team2!)}
                            className="w-4 h-4 accent-green-500"
                          />
                        </div>
                      ) : (
                        <div className="text-red-400 text-xs mt-2">
                          walkower
                        </div>
                      )}

                      {m.winner && (
                        <div className="mt-2 text-white font-bold text-xs md:text-sm">
                          {m.winner} 👑
                        </div>
                      )}

                    </div>
                  ))}

                </div>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}