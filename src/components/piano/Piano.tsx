import { useState } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";
import PianoControls from "./pianoController/PianoControls";

export default function Piano() {
  /*
    TODO: store settings in a cookie and have the initial state be the last selected input
  */
  const [octaves, setOctaves] = useState<number[]>([1, 2]); // default number of octaves
  const [currentKey, selectKey] = useState<string | null>(null);
  const [currentChord, setCurrentChord] = useState<string | null>(null);

  const selectChord = (chord: string | null) => {
    if (chord === null || currentChord === chord) {
      setCurrentChord(null);
    } else {
      setCurrentChord(chord);
    }
  };

  return (
    <>
      <div className="flex p-4 border-t border-black bg-black bg-opacity-100 rounded-lg scale-[70%] max-w-[130vw] min-h-fit overflow-y-hidden overflow-x-scroll">
        <PianoKeyboard
          octaves={octaves}
          currentKey={currentKey}
          selectKey={selectKey}
          currentChord={currentChord}
        />
      </div>
      <div className="flex justify-center items-start w-[75%] h-fit bg-white p-8 rounded-lg">
        <PianoControls
          currentKey={currentKey}
          selectKey={selectKey}
          currentChord={currentChord}
          selectChord={selectChord}
          octaves={octaves}
          setOctaves={setOctaves}
        />
      </div>
    </>
  );
}
