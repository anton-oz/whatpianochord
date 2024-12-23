import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const blackKeys = ["C#", "D#", "F#", "G#", "A#"];

const fullPiano: string[] = [];

let index = 9;
while (fullPiano.length < 88) {
  fullPiano.push(keys[index]);
  index = (index + 1) % keys.length;
}

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

const keyId = (key: string, keyOctave: number) => {
  return `${key}-${keyOctave + 1}`;
};

// const Piano: {
//   keys: string[];
//   blackKeys: string[];
//   fullPiano: string[];
//   chords: string[];
//   selectChord: (chord: number) => void;
//   keyId: typeof keyId;
// } = {
//   keys,
//   blackKeys,
//   fullPiano,
//   chords,
//   selectChord,
//   keyId,
// };

interface Piano {
  keys: string[];
  blackKeys: string[];
  fullPiano: string[];
  chords: string[];
  selectChord: (chord: number) => void | null;
  selectedChord: number | null;
  keyId: typeof keyId;
}

let Piano = {
  keys,
  blackKeys,
  fullPiano,
  chords,
  selectChord: (chord: number) => {
    chord;
  }, // actual function defined in PianoProvider
  selectedChord: null,
  keyId,
};

const PianoContext = createContext<Piano>(Piano);

export const usePianoContext = () => useContext(PianoContext);

export const PianoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChord, setSelectedChord] = useState<number | null>(null);

  const selectChord = (chord: number): void => {
    selectedChord === chord ? setSelectedChord(null) : setSelectedChord(chord);
  };

  const value = {
    ...Piano,
    selectChord,
    selectedChord,
  };

  return (
    <PianoContext.Provider value={value}>{children}</PianoContext.Provider>
  );
};
