import { useState, Dispatch } from "react";

import ScreenToggle from "./components/ScreenToggle";
import ScreenContent from "./components/ScreenContent";
import PianoEngine from "../utils/PianoEngine";

export default function Screen({
  pianoProps,
}: {
  pianoProps: {
    octaves: number[];
    startingOctave: number;
    currentKey: string | null;
    selectKey: Dispatch<string | null>;
    currentChord: string | null;
    chordKeys: (string | null)[];
    inversion: number;
    setInversion: Dispatch<number>;
    selectChord: (chord: string | null) => void;
    Piano: PianoEngine;
  };
}) {
  const [screenOn, setScreenOn] = useState<boolean>(true);
  return (
    <>
      <ScreenToggle screenOn={screenOn} setScreenOn={setScreenOn} />
      <ScreenContent screenOn={screenOn} {...pianoProps} />
    </>
  );
}
