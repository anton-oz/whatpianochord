import { useState, useEffect } from "react";

import { usePianoContext } from "../../Context/PianoContext";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";

import Screen from "./Screen/Screen";
/** TODO: SEE ABOUT HAVING ONE PianoEngine AND PASS AS PROP*/

// update this whenever adding new props to Piano
// export interface pianoProps {
//   octaves: number[];
//   startingOctave: number;
//   currentKey: string | null;
//   selectKey: Dispatch<string | null>;
//   currentChord: string | null;
//   chordKeys: (string | null)[];
//   setChordKeys: Dispatch<(string | null)[]>;
//   inversion: number;
//   setInversion: Dispatch<number>;
//   Piano: PianoEngine;
//   selectChord: (chord: string | null) => void;
//   resetToInitalState: () => void;
// }

// have these values be stored in a cookie, allow user to set their own settings and that will be the new initial state.
// const initialState = {
//   octaves: [1, 2, 3],
//   startingOctave: 3,
//   currentKey: null,
//   currentChord: null,
//   chordKeys: [],
//   inversion: 0,
// };

export default function Piano() {

  const PianoContext = usePianoContext();

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
          <Screen />
        </div>
        <div className="h-[20px] w-full bg-gradient-to-br from-[#e67255] to-[#ce9060] border-b border-black"></div>
        <div className="max-w-full overflow-x-scroll overflow-y-hidden">
          <PianoKeyboard />
        </div>
      </div>
    </>
  );
}
