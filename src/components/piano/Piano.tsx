// COMMENTED OUT FOR PianoContext
import { useState, useEffect } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";

import Screen from "./Screen/Screen";
/** TODO: SEE ABOUT HAVING ONE PianoEngine AND PASS AS PROP*/
// import PianoEngine from "./utils/PianoEngine";

export default function Piano() {
  /*
    TODO: store piano settings / current state in a cookie and have the initial state be the last selected input
  */
  const [octaves, setOctaves] = useState<number[]>([1, 2, 3]); // default number of octaves
  const [startingOctave, setStartingOctave] = useState<number>(3);
  const [currentKey, selectKey] = useState<string | null>(null);
  const [currentChord, setCurrentChord] = useState<string | null>(null);
  const [chordKeys, setChordKeys] = useState<(string | null)[]>([]);
  const [inversion, setInversion] = useState<number>(1);

  const selectChord = (chord: string | null) => {
    if (chord === null || currentChord === chord) {
      setCurrentChord(null);
    } else {
      setCurrentChord(chord);
    }
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
  };

  return (
    <>
      <div
        className={`flex flex-col p-4 pl-2 pt-2 pr-[0.75rem] border-t border-black bg-black bg-opacity-100 rounded-lg scale-[0.7] w-[1855px] min-h-fit`}
        style={{
          transform: `scale(${scale})`,
          // width: `${1855 * scale}px`, // Adjust the width dynamically
        }}
      >
        <div
          className="m-0 min-h-[300px] max-h-[300px] bg-zinc-700 w-full"
          style={boxStyle}
        >
          {/* <DropDownButton /> */}
          <Screen pianoProps={pianoProps} />
        </div>
        <div className="h-[20px] w-full bg-gradient-to-br from-[#e67255] to-[#ce9060] border-b border-black"></div>
        <div className="max-w-full overflow-x-scroll overflow-y-hidden">
          <PianoKeyboard {...pianoProps} />
        </div>
      </div>
    </>
  );
}
