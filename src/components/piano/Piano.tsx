import { useState } from "react";

import PianoKeyboard from "./PianoKeyboard";
import PianoControls from "./PianoControls";

export default function Piano({ octaves }: { octaves: number }) {
  const [currentKey, selectKey] = useState<string | null>(null);
  const [currentChord, setCurrentChord] = useState<string | null>(null);
  const [multiSelect, toggleMultiSelect] = useState<boolean>(false); // TODO: have a toggle for selecting multiple notes at once.

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
      <div className="flex items-start w-[75%] h-fit">
        <PianoControls
          currentKey={currentKey}
          currentChord={currentChord}
          selectChord={selectChord}
        />
      </div>
    </>
  );
}
