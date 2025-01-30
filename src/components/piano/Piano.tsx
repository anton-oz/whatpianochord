import { useState, useEffect, Dispatch } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";

import Screen from "./Screen/Screen";
/** TODO: SEE ABOUT HAVING ONE PianoEngine AND PASS AS PROP*/
import PianoEngine from "./utils/PianoEngine";

// update this whenever adding new props to Piano
export interface pianoProps {
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
  resetToInitalState: () => void;
}

// have these values be stored in a cookie, allow user to set their own settings and that will be the new initial state.
const initialState = {
  octaves: [1, 2, 3],
  startingOctave: 3,
  currentKey: null,
  currentChord: null,
  chordKeys: [],
  inversion: 0,
};

export default function Piano() {
  /*
    TODO: store piano settings / current state in a cookie and have the initial state be the last selected input
  */
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

  const Piano = new PianoEngine(octaves.length, startingOctave);

  const selectChord = (chord: string | null) => {
    if (chord === null || currentChord === chord) {
      setCurrentChord(null);
    } else {
      setCurrentChord(chord);
    }
  };

  const resetToInitalState = () => {
    setOctaves(initialState.octaves);
    setStartingOctave(initialState.startingOctave);
    selectKey(initialState.currentKey);
    setCurrentChord(initialState.currentChord);
    setChordKeys(initialState.chordKeys);
    setInversion(initialState.inversion);
  };

  const boxStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
    backgroundClip: "padding-box",
  };

  // FOR SCALE
  //
  const [scale, setScale] = useState(1); // Initial scale value
  //
  useEffect(() => {
    const calculateScale = () => {
      // Example: Adjust the scale based on window width
      const minWidth = 500; // Minimum width for scaling
      const maxWidth = 1920; // Maximum width for scaling
      const minScale = 0.2; // Minimum scale value
      const maxScale = 0.9; // Maximum scale value

      const clampedWidth = Math.min(
        Math.max(window.innerWidth, minWidth),
        maxWidth
      );
      const newScale =
        minScale +
        ((clampedWidth - minWidth) / (maxWidth - minWidth)) *
          (maxScale - minScale);

      setScale(newScale);
    };
    //
    // Calculate the initial scale and listen for resize events
    calculateScale();
    window.addEventListener("resize", calculateScale);
    //
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  useEffect(() => {
    if (!currentKey) {
      setInversion(0);
    }
  }, [currentKey]);

  // ! EVERYTIME THIS IS UPDATED UPDATE THE pianoProps INTERFACE !
  const pianoProps = {
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
    resetToInitalState,
  };

  return (
    <>
      <div
        className={`flex flex-col p-4 pl-2 pt-2 pr-[0.75rem] border-t border-black bg-black bg-opacity-100 rounded-lg scale-[0.7] w-[1855px] min-h-fit`}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div
          className="m-0 min-h-[300px] max-h-[300px] bg-zinc-700 w-full"
          style={boxStyle}
        >
          <Screen {...pianoProps} />
        </div>
        <div className="h-[20px] w-full bg-gradient-to-br from-[#e67255] to-[#ce9060] border-b border-black"></div>
        <div className="max-w-full overflow-x-scroll overflow-y-hidden">
          <PianoKeyboard {...pianoProps} />
        </div>
      </div>
    </>
  );
}
