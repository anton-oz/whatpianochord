import { Dispatch } from "react";

import KeyPicker from "./components/KeyPicker";
import ChordType from "./components/ChordType";

export default function PianoControls({
  currentKey,
  currentChord,
  selectChord,
  octaves,
  setOctaves,
}: {
  currentKey: string | null;
  currentChord: string | null;
  selectChord: (chord: string) => void;
  octaves: number[];
  setOctaves: Dispatch<number[]>;
}) {
  const increase = () => {
    setOctaves([...octaves, octaves[octaves.length - 1] + 1]);
  };
  const decrease = () => {
    setOctaves(octaves.slice(0, octaves.length - 1));
  };
  return (
    <>
      <KeyPicker currentKey={currentKey} />
      <ChordType currentChord={currentChord} selectChord={selectChord} />
      {/* New Component */}
      <div className="w-[33%] space-x-4">
        <button
          className="px-1 border border-black rounded"
          onClick={() => increase()}
        >
          +
        </button>
        <button
          className="px-1 border border-black rounded"
          onClick={() => decrease()}
        >
          -
        </button>
      </div>
    </>
  );
}
