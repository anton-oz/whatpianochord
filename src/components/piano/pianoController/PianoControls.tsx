import { Dispatch } from "react";

import KeyPicker from "./components/KeyPicker";
import ChordType from "./components/ChordType";
import OctaveControl from "./components/OctaveControl";

export default function PianoControls({
  currentKey,
  selectKey,
  currentChord,
  selectChord,
  octaves,
  setOctaves,
}: {
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  currentChord: string | null;
  selectChord: (chord: string | null) => void;
  octaves: number[];
  setOctaves: Dispatch<number[]>;
}) {
  return (
    <>
      <KeyPicker
        currentKey={currentKey}
        selectKey={selectKey}
        selectChord={selectChord}
      />
      <ChordType
        currentKey={currentKey}
        currentChord={currentChord}
        selectChord={selectChord}
      />
      <OctaveControl octaves={octaves} setOctaves={setOctaves} />
    </>
  );
}
