// import { useContext } from "react";
import { Minus, Plus } from "lucide-react";
import { usePiano } from "../../../Context/PianoContext";

import PianoEngine from "../../piano/utils/PianoEngine";

export default function ScreenContent({ screenOn }: { screenOn: boolean }) {
  // const piano = useContext(PianoContext);

  const { setInversion, inversion } = usePiano();

  const piano = usePiano();

  const Piano = new PianoEngine();

  const chords = Piano.getChords();

  const svgStyle = {
    className:
      "cursor-pointer p-2 rounded border-2 border-black hover:bg-black hover:text-white transition-all duration-100 active:translate-y-1",
    strokeWidth: 2.5,
    size: 40,
  };
  return (
    /* back screen */
    <div
      className={`flex justify-start items-start p-2 absolute w-fit h-[250px] bg-zinc-900 bg-opacity-95 top-8 left-28 transition-all duration-300 rounded-lg sm:overflow-hidden overflow-y-hidden overflow-x-scroll`}
    >
      {/* blue screen */}
      <div
        className={`h-full w-full flex justify-start items-center p-4 bg-zinc-200 rounded transition-all duration-200 ${
          screenOn
            ? "opacity-100 translate-y-0 translate-x-0 blur-none"
            : "opacity-0 blur-sm"
        }`}
      >
        {/* 
          current note div

          TODO: use KeyPicker component
        */}
        <div className="place-self-center">
          <h3 className="text-xl font-medium w-max">Current Note: </h3>
          <p
            className={`place-self-center text-4xl ${
              piano?.currentKey ? "font-semibold" : ""
            }`}
          >
            {piano?.currentKey ?? "N/A"}
          </p>
        </div>
        {/* 
          chord selecting div

          TODO: use ChordPicker Component
        */}
        <div className="w-[400px] ">
          <div className="m-4 p-3 flex flex-wrap justify-center items-center rounded-lg ">
            {chords.map((chord, i) => (
              <p
                key={i}
                onClick={() => {
                  piano?.selectChord(chord);
                }}
                className={` rounded m-[.3rem] px-4 py-2 cursor-pointer text-xl   ${
                  piano?.currentChord === chord
                    ? "bg-zinc-900 text-white font-medium italic underline-offset-4 underline "
                    : "bg-zinc-50 hover:bg-zinc-100 "
                }`}
              >
                {chord}
              </p>
            ))}
          </div>
        </div>
        {/* INVERSION DIV */}
        <div className="h-full flex flex-col justify-center items-center p-4">
          <h3 className="flex flex-col justify-center items-center text-2xl">
            Inversion:{" "}
            <span className="font-semibold text-5xl p-2">{inversion}</span>
          </h3>
          <div className="flex items-center justify-around space-x-2">
            <Minus
              onClick={() => {
                const newVal = inversion - 1;
                setInversion(newVal);
              }}
              className={svgStyle.className}
              strokeWidth={svgStyle.strokeWidth}
              size={svgStyle.size}
            />
            <Plus
              onClick={() => {
                const newVal = inversion + 1;
                setInversion(newVal);
              }}
              className={svgStyle.className}
              strokeWidth={svgStyle.strokeWidth}
              size={svgStyle.size}
            />
          </div>
        </div>
        {/*  
          octave div
        */}
        <div></div>
      </div>
    </div>
  );
}
