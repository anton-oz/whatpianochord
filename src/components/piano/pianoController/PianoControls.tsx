import { Dispatch } from "react";

import KeyPicker from "./components/KeyPicker";
import ChordType from "./components/ChordType";
import OctaveControl from "./components/OctaveControl";

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
  return (
    <>
      <KeyPicker currentKey={currentKey} />
      <ChordType currentChord={currentChord} selectChord={selectChord} />
      <OctaveControl octaves={octaves} setOctaves={setOctaves} />
    </>
  );
}
