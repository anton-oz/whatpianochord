import { useContext } from "react";
import { PianoContext } from "../Context/PianoContext";

import PianoEngine from "./piano/utils/PianoEngine";
import OctaveControl from "./piano/pianoController/components/OctaveControl";

export default function DropDownMenu({ menuOpen }: { menuOpen: boolean }) {
  const piano = useContext(PianoContext);

  const Piano = new PianoEngine();

  const chords = Piano.getChords();
  return (
    <div
      className={`flex justify-start items-start p-2 absolute w-[72.5vw] h-[30vh] bg-zinc-800 bg-opacity-85 top-[5rem] left-[13vw] transition-all duration-300 rounded-b-lg sm:overflow-hidden overflow-y-hidden overflow-x-scroll ${
        menuOpen
          ? "opacity-100 scale-95 translate-y-0 translate-x-0 blur-none"
          : "opacity-0 scale-[0.1] -translate-y-[50%] -translate-x-[40%] -z-50 blur-sm"
      }`}
    >
      <div className="h-full w-full flex justify-around items-center">
        {/* 
          current note div

          TODO: use KeyPicker component
        */}
        <div className="text-white place-self-center">
          <h3 className="text-xl font-medium">Current Note: </h3>
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
        <div className="max-w-[50%] ">
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
        {/*  
          octave div
        */}
        <OctaveControl
          octaves={
            piano ? (piano?.octaves ? piano.octaves : undefined) : undefined
          }
          setOctaves={
            piano
              ? piano?.setOctaves
                ? piano.setOctaves
                : undefined
              : undefined
          }
        />
      </div>
    </div>
  );
}
