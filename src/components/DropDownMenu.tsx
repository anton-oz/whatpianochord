import { useContext, useEffect, useMemo } from "react";
import { PianoContext } from "../Context/PianoContext";

import PianoEngine from "./piano/utils/PianoEngine";

export default function DropDownMenu({ menuOpen }: { menuOpen: boolean }) {
  const piano = useContext(PianoContext);

  // Ensure PianoEngine is not re-created on every render
  const Piano = useMemo(() => new PianoEngine(), []);

  interface PianoControls {
    currentKey?: string | null;
    currentChord?: string | null;
    octaves?: number | null;
    startingOctave?: number | null;
    chords: string[];
  }

  const controls: PianoControls = {
    currentKey: piano?.currentKey ?? "n/a",
    currentChord: piano?.currentChord ?? "n/a",
    octaves: Array.isArray(piano?.octaves)
      ? piano?.octaves.length
      : piano?.octaves ?? null,
    startingOctave: piano?.startingOctave ?? 0,
    chords: Piano.getChords() ?? ["n/a"],
  };

  useEffect(() => {
    console.log("Piano Controls:", controls);
  }, [controls]);

  return (
    <div
      className={`flex absolute w-[72.5vw] h-[30vh] bg-zinc-800 bg-opacity-85 top-[5rem] left-[13vw] transition-all duration-300 rounded-b-lg ${
        menuOpen
          ? "opacity-100 scale-95 translate-y-0 translate-x-0 blur-none"
          : "opacity-0 scale-[0.1] -translate-y-[50%] -translate-x-[40%] -z-50 blur-sm"
      }`}
    >
      {Object.entries(controls).map(([key, value]) => (
        <div
          key={key} // Ensure key is on the top-level element
          className="w-full h-[70%] flex justify-center items-center"
        >
          <div className="flex flex-col items-center justify-center w-fit p-6">
            <h4 className="text-2xl px-4 py-1 rounded-t border-t-2 border-x-2 border-white bg-zinc-700 bg-opacity-80 text-zinc-50 font-semibold text-center place-self-center w-full h-fit">
              {key}:
            </h4>
            <div className="w-full h-[50%] place-content-start">
              <p className="rounded-b-lg text-black bg-zinc-50 px-4 py-2 font-semibold text-4xl text-center">
                {value !== undefined && value !== null
                  ? Array.isArray(value)
                    ? value.join(", ")
                    : value
                  : "n/a"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
