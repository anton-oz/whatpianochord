import PianoEngine from "../../utils/PianoEngine";

export default function ChordType({
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
      <div className="flex flex-wrap justify-center items-center w-[75%]">
        {chords.map((chord, i) => (
          <button
            key={`chord-${i}`}
            onClick={() => {
              selectChord(chord);
            }}
            className={`border-2 border-black rounded-lg px-2 m-1 w-fit  ${
              currentKey !== null && currentChord
                ? chords.indexOf(currentChord) === i
                  ? "bg-sky-500 text-white"
                  : "bg-slate-150"
                : "bg-slate-150"
            } ${currentKey === null ? "bg-slate-150" : null}`}
          >
            {chord}
          </button>
        ))}
      </div>
    </div>
  );
}
