import { useContext, createContext, Dispatch } from "react";
import { PianoEngine } from "@/components/piano/utils/PianoEngine";

export const ThemeContext = createContext(false);

export const useThemeContext = () => useContext(ThemeContext);

const pianoContext = {
  octaves: 3,
  setOctaves: () => {},
  startingOctave: 0,
  selectedKey: "",
  selectKey: () => {},
  currentChord: "",
  chordKeys: [""],
  setChordKeys: () => {},
  inversion: 0,
  setInversion: () => {},
  Piano: new PianoEngine(), // placeholder, actual value defined in PianoContextProvider
  pianoColors: [],
  setPianoColors: () => {},
  selectChord: () => {},
  resetToInit: () => {},
  resetScreenToInit: () => {},
};

export interface PianoContext {
  octaves: number;
  setOctaves: Dispatch<number>;
  startingOctave: number;
  selectedKey: string | null;
  selectKey: Dispatch<string | null>;
  currentChord: string | null;
  chordKeys: (string | null)[];
  setChordKeys: Dispatch<(string | null)[]>;
  inversion: number;
  setInversion: Dispatch<number>;
  Piano: PianoEngine;
  pianoColors: string[];
  setPianoColors: Dispatch<string[]>;
  selectChord: (chord: string | null) => void;
  resetToInit: () => void;
}

export const PianoContext = createContext<PianoContext>(pianoContext);

export const usePianoContext = () => useContext(PianoContext);
