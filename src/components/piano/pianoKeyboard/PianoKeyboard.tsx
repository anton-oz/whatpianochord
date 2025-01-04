import { useState, useEffect, Dispatch } from "react";
import PianoEngine from "../utils/PianoEngine";
// import { usePiano } from "../../../Context/PianoContext";

export default function PianoKeyboard({
  octaves,
  startingOctave,
  currentKey,
  selectKey,
  currentChord,
  chordKeys,
  setChordKeys,
  inversion,
  setInversion,
}: {
  octaves: number[];
  startingOctave: number;
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  currentChord: string | null;
  chordKeys: (string | null)[];
  setChordKeys: Dispatch<(string | null)[]>;
  inversion: number;
  setInversion: Dispatch<number>;
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const Piano = new PianoEngine();
  const newKeys = Piano.getKeys();
  const newBlackKeys: string[] = [];
  newKeys.forEach((key) =>
    key[key.length - 1] === "#" ? newBlackKeys.push(key) : null
  );
  const newChords = Piano.getChords();

  useEffect(() => {
    if (currentKey === null || currentChord === null) {
      setChordKeys([null]);
      setInversion(1);
      return;
    }
    const chord = Piano.chord(
      currentKey,
      newChords.find((chord) => chord === currentChord) as string,
      inversion
    );
    if (chord === undefined) {
      console.log("chord is undefined");
      return;
    }
    setChordKeys(chord);
  }, [currentKey, currentChord, inversion]);

  const selectNote = (key: string, octave: number) => {
    const id = Piano.keyId(key, octave);

    if (id === currentKey) {
      selectKey(null);
      return;
    }
    selectKey(id);
  };

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      className="flex
    "
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {octaves.map((_, octave) => (
        <div
          key={"piano-container-" + octave + startingOctave}
          className="min-w-[610.06px] h-[532.91px] flex justify-between relative space-x-[0.2px] mx-[1px]"
        >
          {/* RENDER WHITE KEYS */}
          {newKeys.map(
            (key, i) =>
              key[1] !== "#" && (
                <div
                  key={"white-keys-" + i + octave + startingOctave}
                  id={Piano.keyId(key, octave + startingOctave)}
                  onMouseDown={() => selectNote(key, octave + startingOctave)}
                  onMouseEnter={() => {
                    if (isMouseDown) selectNote(key, octave + startingOctave);
                  }}
                  className={`w-[84.75px] flex justify-center items-end border border-black rounded-b-lg  shadow-lg z-10 bg-opacity-100 transition-transform duration-150 bg-gradient-to-t ${
                    currentKey === Piano.keyId(key, octave + startingOctave)
                      ? "from-amber-500 to-amber-600 scale-[0.97] h-[101%] top-0"
                      : chordKeys.some(
                          (chordKey) =>
                            chordKey ===
                            Piano.keyId(key, octave + startingOctave)
                        )
                      ? "from-sky-200 to-sky-300  top-0 scale-[0.98]"
                      : "from-neutral-100 to-neutral-100"
                  } `}
                >
                  {/* div for key shine */}
                  <div
                    className={`relative rounded-b-lg place-self-start h-[99%] w-[90%] bg-gradient-to-t  ${
                      currentKey === Piano.keyId(key, octave + startingOctave)
                        ? "from-amber-400 to-amber-500"
                        : chordKeys.some(
                            (chordKey) =>
                              chordKey ===
                              Piano.keyId(key, octave + startingOctave)
                          )
                        ? "from-sky-200 to-sky-300"
                        : "from-white to-neutral-50"
                    }`}
                  ></div>
                </div>
              )
          )}
          <div className="absolute left-[56.69px] flex h-[65%] min-w-[502.68px]">
            {/* RENDER BLACK KEYS */}
            {newBlackKeys.map((key, i) => (
              <div
                key={"black-keys-" + i + octave + startingOctave}
                id={Piano.keyId(key, octave + startingOctave)}
                onMouseDown={() => selectNote(key, octave + startingOctave)}
                onMouseEnter={() => {
                  if (isMouseDown) selectNote(key, octave + startingOctave);
                }}
                className={`h-full min-w-[38.02px] relative flex justify-center items-end border border-black rounded-b-lg shadow-lg text-white z-20 transition-transform duration-150 ${
                  currentKey === Piano.keyId(key, octave + startingOctave)
                    ? "bg-gradient-to-tr from-amber-950 to-amber-800 scale-[0.96] h-[95%] top-0"
                    : chordKeys.some(
                        (chordKey) =>
                          chordKey === Piano.keyId(key, octave + startingOctave)
                      )
                    ? "bg-sky-300 scale-[0.96] h-[95%] top-0"
                    : "bg-black"
                }`}
                style={{
                  left: `${
                    i === 0
                      ? 6
                      : i === 1
                      ? 64.03
                      : i === 2
                      ? 64.03 + 135.46
                      : i === 3
                      ? 60.43 + 135.46 + 55.45
                      : i === 4
                      ? 55.03 + 135.46 + 55.45 * 2
                      : null
                  }px`,
                }}
              >
                <div
                  className={`absolute m-[1px] w-[80%] h-[95%] rounded-b-md top-0 bg-gradient-to-tr ${
                    currentKey === Piano.keyId(key, octave + startingOctave)
                      ? "from-amber-600 to-amber-500"
                      : chordKeys.some(
                          (chordKey) =>
                            chordKey ===
                            Piano.keyId(key, octave + startingOctave)
                        )
                      ? "from-sky-200 to-sky-150"
                      : "from-zinc-900 to-zinc-600"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
