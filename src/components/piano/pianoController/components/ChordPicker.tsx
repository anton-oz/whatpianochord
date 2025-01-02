import PianoEngine from "../../utils/PianoEngine";

export default function ChordPicker({
  currentKey,
  currentChord,
  selectChord,
}: {
  currentKey: string | null;
  currentChord: string | null;
  selectChord: (chord: string) => void;
}) {
  const Piano = new PianoEngine();

  const chords = Piano.getChords();

  return (
    <div className="w-[33%] h-fit flex flex-col justify-center items-center">
      <p className="text-2xl text-semibold">Pick the type of chord: </p>
      <div className="flex flex-wrap justify-center items-center w-[110%] h-[110%]">
        {chords.map((chord, i) => (
          <button
            key={`chord-${i}`}
            onClick={() => {
              selectChord(chord);
            }}
            className={` rounded-lg px-2 py-1 m-1 mb-3 w-fit text-xl font-semibold hover:bg-sky-300 bg-opacity-75 border-b-2  border-r-2  border-opacity-0  ${
              currentKey !== null && currentChord
                ? chords.indexOf(currentChord) === i
                  ? "bg-gradient-to-br from-emerald-400 to-sky-500 text-white hover:text-black border-black border-opacity-100 "
                  : "bg-sky-100 border-r-sky-100 border-b-sky-100"
                : "bg-sky-100 border-r-sky-100 border-b-sky-100"
            } ${currentKey === null ? "bg-slate-150" : null}`}
          >
            {chord}
          </button>
        ))}
      </div>
    </div>
  );
}
