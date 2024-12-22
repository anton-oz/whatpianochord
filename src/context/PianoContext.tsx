import React from "react";
import { createContext, useContext } from "react";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const blackKeys = ["C#", "D#", "F#", "G#", "A#"];

const fullPiano = [];

let index = 9;
while (fullPiano.length < 88) {
  fullPiano.push(keys[index]);
  index = (index + 1) % keys.length;
}

const Piano = {
  keys,
  blackKeys,
  fullPiano,
};

const PianoContext = createContext<typeof Piano>(Piano);

export const usePianoContext = () => useContext(PianoContext);

export const PianoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PianoContext.Provider value={Piano}>{children}</PianoContext.Provider>
  );
};
