import { Minus, Plus } from "lucide-react";
import { usePianoContext } from "@/Context/utils";

export default function Screen() {
  const PianoContext = usePianoContext();

  const { Piano, currentChord, inversion, setInversion, octaves, setOctaves } =
    PianoContext;

  const chords = Piano.getChords();

  const inversionMinus = () => {
    if (!currentChord) return;
    const chordNotes = Piano.getChordIntervals(currentChord);
    if (!chordNotes) return;
    const newVal = inversion > 0 ? inversion - 1 : 0;
    setInversion(newVal);
  };

  const inversionPlus = () => {
    if (!currentChord) return;
    const chordNotes = Piano.getChordIntervals(currentChord);
    if (!chordNotes) return;
    const newVal =
      inversion < 0
        ? inversion + 1
        : inversion === chordNotes.length - 1
          ? 0
          : (inversion % (chordNotes.length - 1)) + 1;
    setInversion(newVal);
  };

  const octaveMinus = () => {
    if (octaves === 3) {
      return;
    }
    setOctaves(octaves - 1);
  };

  const octavePlus = () => {
    if (octaves >= 8) {
      return;
    }
    setOctaves(octaves + 1);
  };

  return (
    /* back screen */
    <div
      className={`flex justify-start items-start p-2 absolute w-fit h-[250px] bg-zinc-900 bg-opacity-95 transition-all duration-300 rounded-lg sm:overflow-hidden overflow-y-hidden overflow-x-scroll`}
    >
      {/* screen */}
      <div
        className={
          "h-full w-full flex justify-center items-center p-4 bg-zinc-200 rounded transition-all duration-200 opacity-100 translate-y-0 translate-x-0 blur-none"
        }
      >
        {/* 
          current note div

          TODO: use KeyPicker component
        */}
        <div className="place-self-center">
          <h3 className="text-xl font-medium w-max">Current Note: </h3>
          <p
            className={`place-self-center text-4xl ${
              PianoContext.selectedKey ? "font-semibold" : ""
            }`}
          >
            {PianoContext.selectedKey ?? "N/A"}
          </p>
        </div>
        {/* 
          chord selecting div
          TODO: use ChordPicker Component
        */}
        <div className="w-[600px] h-full overflow-x-auto">
          <div className="p-3 flex flex-wrap justify-center items-center rounded-lg ">
            {chords.map((chord, i) => (
              <p
                key={i}
                onClick={() => {
                  PianoContext.selectChord(chord);
                }}
                className={` rounded m-[.3rem] px-4 py-2 cursor-pointer text-xl   ${
                  PianoContext.currentChord === chord
                    ? "bg-zinc-900 text-white underline-offset-4 underline "
                    : "bg-zinc-50 hover:bg-zinc-100 "
                }`}
              >
                {chord}
              </p>
            ))}
          </div>
        </div>
        {/* INVERSION DIV */}
        <div className="h-full flex flex-col justify-center items-center w-[10rem] px-2 py-4">
          <h3 className="flex flex-col justify-center items-center text-2xl">
            Inversion:{" "}
          </h3>
          <p className="font-semibold text-5xl p-2 w-full text-center">
            {inversion === 0 ? "root" : inversion}
          </p>
          <PlusMinus plus={inversionPlus} minus={inversionMinus} />
        </div>
        {/* OCTAVE DIV */}
        <div className="h-full flex flex-col justify-center items-center w-[10rem] px-2 py-4">
          <h3 className="flex flex-col justify-center items-center text-2xl">
            Octaves:{" "}
          </h3>
          <p className="font-semibold text-5xl p-2 w-full text-center">
            {octaves}
          </p>
          <PlusMinus plus={octavePlus} minus={octaveMinus} />
        </div>
      </div>
    </div>
  );
}

// TODO: seperate to own component!!
function PlusMinus({ plus, minus }: { plus: () => void; minus: () => void }) {
  const svgStyle = {
    className:
      "cursor-pointer p-2 rounded border-2 border-black hover:bg-black hover:text-white transition-all duration-100 active:translate-y-1",
    strokeWidth: 2.5,
    size: 40,
  };

  return (
    <div className="flex items-center justify-around space-x-2 py-2">
      <Minus
        onClick={minus}
        className={svgStyle.className}
        strokeWidth={svgStyle.strokeWidth}
        size={svgStyle.size}
      />
      <Plus
        onClick={plus}
        className={svgStyle.className}
        strokeWidth={svgStyle.strokeWidth}
        size={svgStyle.size}
      />
    </div>
  );
}
