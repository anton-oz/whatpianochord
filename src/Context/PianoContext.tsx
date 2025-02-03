import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  ReactNode,
  useContext,
} from "react";

import { PianoEngine } from "../components/Piano/utils/PianoEngine";

const none = undefined;

// placeholder obj, actual state defined in PianoContextProvider
const pianoContext = {
  octaves: [0],
  startingOctave: 0,
  currentKey: "",
  selectKey: () => {
    return "";
  },
  currentChord: "",
  chordKeys: [""],
  setChordKeys: () => {
    return [""];
  },
  inversion: 0,
  setInversion: () => {
    return 0;
  },
  Piano: new PianoEngine(none, none), // placeholder, actual value defined in PianoContextProvider
  selectChord: (chord: string | null) => {
    return chord;
  },
  resetToInitialState: () => {},
};

const PianoContext = createContext<PianoContext>(pianoContext);

/*
  TODO: store initial state in a cookie and have the initial state be the last selected input
*/

const initialState = {
  octaves: [1, 2, 3],
  startingOctave: 3,
  currentKey: null,
  currentChord: null,
  chordKeys: [],
  inversion: 0,
};

export interface PianoContext {
  octaves: number[];
  startingOctave: number;
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  currentChord: string | null;
  chordKeys: (string | null)[];
  setChordKeys: Dispatch<(string | null)[]>;
  inversion: number;
  setInversion: Dispatch<number>;
  Piano: PianoEngine;
  selectChord: (chord: string | null) => void;
  resetToInitialState: () => void;
}

export const usePianoContext = () => useContext(PianoContext);

export function PianoContextProvider({ children }: { children: ReactNode }) {
  const [octaves, setOctaves] = useState<number[]>(initialState.octaves); // default number of octaves ( its an array because I am using map function to render each 12 key block)
  const [startingOctave, setStartingOctave] = useState<number>(
    initialState.startingOctave
  );
  const [currentKey, selectKey] = useState<string | null>(
    initialState.currentKey
  );
  const [currentChord, setCurrentChord] = useState<string | null>(
    initialState.currentChord
  );
  const [chordKeys, setChordKeys] = useState<(string | null)[]>(
    initialState.chordKeys
  );
  const [inversion, setInversion] = useState<number>(initialState.inversion);

  const selectChord = (chord: string | null) => {
    if (chord === null || currentChord === chord) {
      setCurrentChord(null);
    } else {
      setCurrentChord(chord);
    }
  };

  const resetToInitialState = () => {
    setOctaves(initialState.octaves);
    setStartingOctave(initialState.startingOctave);
    selectKey(initialState.currentKey);
    setCurrentChord(initialState.currentChord);
    setChordKeys(initialState.chordKeys);
    setInversion(initialState.inversion);
  };

  useEffect(() => {
    if (!currentKey || !currentChord) {
      setInversion(0);
    }
  }, [currentKey, currentChord]);

  const Piano = new PianoEngine(octaves.length, startingOctave);

  const value = {
    octaves,
    setOctaves,
    startingOctave,
    setStartingOctave,
    currentKey,
    selectKey,
    currentChord,
    selectChord,
    chordKeys,
    setChordKeys,
    inversion,
    setInversion,
    Piano,
    resetToInitialState,
  };

  return (
    <PianoContext.Provider value={value}>{children}</PianoContext.Provider>
  );
}
