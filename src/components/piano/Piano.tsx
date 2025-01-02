import { useState } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";
import PianoControls from "./pianoController/PianoControls";

export default function Piano({
  whatToReturn,
}: {
  whatToReturn: undefined | string;
}) {
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

  if (whatToReturn === "controls") {
    return (
      <>
        <div className="flex justify-center items-center min-w-[25%] h-full bg-white p-8 border-r-2 border-black">
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

  return (
    <>
      <div className="flex p-4 border-t border-black bg-black bg-opacity-100 rounded-lg scale-[0.70] w-fit min-h-fit overflow-y-hidden overflow-x-scroll">
        <PianoKeyboard
          octaves={octaves}
          currentKey={currentKey}
          selectKey={selectKey}
          currentChord={currentChord}
        />
      </div>
      {/* <div className="flex justify-center items-center min-w-[25%] h-full bg-white p-8 border-r-2 border-black">
        <PianoControls
          currentKey={currentKey}
          selectKey={selectKey}
          currentChord={currentChord}
          selectChord={selectChord}
          octaves={octaves}
          setOctaves={setOctaves}
        />
      </div> */}
    </>
  );
}
