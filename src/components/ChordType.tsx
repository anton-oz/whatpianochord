import { useState } from "react";

export default function ChordType() {
  const [selectedChord, setSelectedChord] = useState<number | null>(null);

  const chords = [
    "major",
    "minor",
    "augmented",
    "diminished",
    "sus2",
    "sus4",
    "major 7th",
    "minor 7th",
    "dominant 7th",
    "diminished 7th",
  ];

  return (
    <div className="w-[33%] h-fit flex flex-col justify-center items-center">
      <p className="text-2xl text-semibold">Pick the type of chord: </p>
      <div className="flex flex-wrap justify-center items-center w-[75%]">
        {chords.map((chord, i) => (
          <button
            key={`chord-${i}`}
            onClick={() => setSelectedChord(i)}
            className={`border-2 border-black rounded-lg px-2 m-1 w-fit  ${
              selectedChord === i ? "bg-sky-500 text-white" : "bg-slate-150"
            }`}
          >
            {chord}
          </button>
        ))}
      </div>
    </div>
  );
}
