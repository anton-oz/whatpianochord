import { useState } from "react";
import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";
import Screen from "./Screen/Screen";

export default function Piano() {
  const boxStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
    backgroundClip: "padding-box",
  };

  // FOR SCALE
  //
  const [scale, _] = useState(1); // Initial scale value
  return (
    <>
      <div
        className={`flex flex-col p-4 pl-2 pt-2 pr-[0.75rem] border-t border-black bg-black bg-opacity-100 rounded-lg`}
        style={{
          transition: "0.4s ease-in-out",
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
        <div className="max-w-full`">
          <PianoKeyboard />
        </div>
      </div>
    </>
  );
}
