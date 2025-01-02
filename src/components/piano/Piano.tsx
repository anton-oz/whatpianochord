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

  const selectChord = (chord: string) => {
    if (currentChord === chord) {
      setCurrentChord(null);
    } else {
      setCurrentChord(chord);
    }
  };

  return (
    <>
      <div className="flex border-t border-black scale-[80%]">
        <PianoKeyboard
          octaves={octaves}
          currentKey={currentKey}
          selectKey={selectKey}
          currentChord={currentChord}
        />
      </div>
      <div className="flex justify-center items-start w-[75%] h-fit">
        <PianoControls
          currentKey={currentKey}
          currentChord={currentChord}
          selectChord={selectChord}
          octaves={octaves}
          setOctaves={setOctaves}
        />
      </div>
    </>
  );
}
