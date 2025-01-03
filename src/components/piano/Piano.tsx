// COMMENTED OUT FOR PianoContext
// import { useState, } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";
import PianoControls from "./pianoController/PianoControls";

import { usePiano } from "../../Context/PianoContext";
import DropDownButton from "../DropDownButton";

export default function Piano({ whatToReturn }: { whatToReturn?: string }) {
  /*
    TODO: store piano settings / current state in a cookie and have the initial state be the last selected input
  */
  /*
    // COMMENTED OUT FOR PianoContext

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
  const boxStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
    backgroundClip: "padding-box",
  };

  return (
    <>
      <div className="max-w-full flex flex-col p-4 pl-2 pt-2 pr-[0.75rem] border-t border-black bg-black bg-opacity-100 rounded-lg scale-[.8] w-[1240px] min-h-fit">
        <div
          className="m-0 min-h-[300px] max-h-[300px] bg-zinc-700"
          style={boxStyle}
        >
          <DropDownButton />
          {/* <PianoControls
            currentKey={currentKey}
            selectKey={selectKey}
            currentChord={currentChord}
            selectChord={selectChord}
            octaves={octaves}
            setOctaves={setOctaves}
          /> */}
        </div>
        <div className="h-[20px] w-full bg-gradient-to-br from-[#e67255] to-[#ce9060] border-b border-black"></div>
        <div className="max-w-full overflow-x-scroll overflow-y-hidden">
          <PianoKeyboard
            octaves={octaves}
            currentKey={currentKey}
            selectKey={selectKey}
            currentChord={currentChord}
          />
        </div>
      </div>
    </>
  );
}
