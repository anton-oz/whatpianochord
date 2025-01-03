import { useState, useEffect, useContext } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";
import PianoControls from "./pianoController/PianoControls";

import { usePiano } from "../../Context/PianoContext";

export default function Piano({ whatToReturn }: { whatToReturn?: string }) {
  /*
    TODO: store settings in a cookie and have the initial state be the last selected input
  */
  /*
    const [octaves, setOctaves] = useState<number[]>([1, 2]); // default number of octaves
    const [currentKey, selectKey] = useState<string | null>(null);
    const [currentChord, setCurrentChord] = useState<string | null>(null);
  */
  // const selectChord = (chord: string | null) => {
  //   if (chord === null || currentChord === chord) {
  //     setCurrentChord(null);
  //   } else {
  //     setCurrentChord(chord);
  //   }
  // };

  const {
    octaves,
    setOctaves,
    currentKey,
    selectKey,
    currentChord,
    selectChord,
  } = usePiano();

  // useEffect(() => {
  //   console.log(currentKey);
  // }, [currentKey]);

  if (whatToReturn === "controls") {
    return (
      <>
        <div className="flex justify-center items-center min-w-[25%] h-full bg-zinc-700 rounded-lg px-4 py-2">
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
      <div className="mt-[10%] flex p-4 border-t border-black bg-black bg-opacity-100 rounded-lg scale-[0.70] w-fit min-h-fit overflow-y-hidden overflow-x-scroll">
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
