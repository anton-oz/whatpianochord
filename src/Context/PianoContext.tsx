import { useState, useEffect, ReactNode } from "react";
import { PianoContext } from "./utils";
import { PianoEngine } from "@/components/piano/utils/PianoEngine";

// placeholder obj, actual state defined in PianoContextProvider

/*
  TODO: store initial state in a cookie and have the initial state be the last selected input
*/

const initialState = {
  octaves: 3,
  startingOctave: 3,
  selectedKey: null,
  chordSymbol: null,
  currentChord: null,
  chordKeys: [],
  inversion: 0,
  pianoColors: ["#ff7e5f", "#feb47b"],
};

export function PianoContextProvider({ children }: { children: ReactNode }) {
  const [octaves, setOctaves] = useState<number>(initialState.octaves); // default number of octaves ( its an array because I am using map function to render each 12 key block)
  const [startingOctave, setStartingOctave] = useState<number>(
    initialState.startingOctave,
  );
  const [selectedKey, selectKey] = useState<string | null>(
    initialState.selectedKey,
  );
  // TODO:
  // const [chordSymbol, setChordSymbol] = useState<string | null>(
  //   initialState.chordSymbol,
  // );
  const [currentChord, setCurrentChord] = useState<string | null>(
    initialState.currentChord,
  );
  const [chordKeys, setChordKeys] = useState<(string | null)[]>(
    initialState.chordKeys,
  );
  const [inversion, setInversion] = useState<number>(initialState.inversion);

  const [pianoColors, setPianoColors] = useState<string[]>(
    initialState.pianoColors,
  );

  const selectChord = (chord: string | null) => {
    if (chord === null || currentChord === chord) {
      setCurrentChord(null);
    } else {
      setCurrentChord(chord);
    }
  };

  const resetToInit = () => {
    setOctaves(initialState.octaves);
    setStartingOctave(initialState.startingOctave);
    selectKey(initialState.selectedKey);
    setCurrentChord(initialState.currentChord);
    setChordKeys(initialState.chordKeys);
    setInversion(initialState.inversion);
    setPianoColors(initialState.pianoColors);
  };

  useEffect(() => {
    if (!selectedKey || !currentChord) {
      setInversion(0);
    }
  }, [selectedKey, currentChord]);

  const Piano = new PianoEngine(octaves, startingOctave);

  const value = {
    octaves,
    setOctaves,
    startingOctave,
    setStartingOctave,
    selectedKey,
    selectKey,
    currentChord,
    selectChord,
    chordKeys,
    setChordKeys,
    inversion,
    setInversion,
    Piano,
    pianoColors,
    setPianoColors,
    resetToInit,
  };

  return (
    <PianoContext.Provider value={value}>{children}</PianoContext.Provider>
  );
}
