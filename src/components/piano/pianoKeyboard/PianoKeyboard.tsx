import { useState, useEffect, Dispatch } from "react";
import PianoEngine from "../utils/PianoEngine";

export default function PianoKeyboard({
  octaves,
  currentKey,
  selectKey,
  currentChord,
}: {
  octaves: number[];
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  currentChord: string | null;
}) {
  const [chordKeys, setChordKeys] = useState<(string | null)[]>([]);
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
      return;
    }
    const chord = Piano.chord(
      currentKey,
      newChords.find((chord) => chord === currentChord) as string
    );
    if (chord === undefined) {
      console.log("chord is undefined");
      return;
    }
    setChordKeys(chord);
  }, [currentKey, currentChord]);

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
          key={"piano-container-" + octave}
          className="min-w-[610.06px] h-[532.91px] flex justify-between relative space-x-[0.2px] mx-[1px]"
        >
          {newKeys.map(
            (key, i) =>
              key[1] !== "#" && (
                <div
                  key={"white-keys-" + i + octave}
                  id={Piano.keyId(key, octave)}
                  onMouseDown={() => selectNote(key, octave)}
                  onMouseEnter={() => {
                    if (isMouseDown) selectNote(key, octave);
                  }}
                  className={`w-[84.75px] flex justify-center items-end border border-black rounded-b-lg  shadow-lg z-10 bg-opacity-100 transition-transform duration-150 bg-gradient-to-t ${
                    currentKey === Piano.keyId(key, octave) ||
                    chordKeys.some(
                      (chordKey, chordKeyIndex) =>
                        chordKeyIndex !== 0 &&
                        chordKey === Piano.keyId(key, octave)
                    )
                      ? "from-sky-200 to-sky-300 h-[102.5%] top-0 scale-[0.99]"
                      : "from-neutral-100 to-neutral-100"
                  } `}
                >
                  <div
                    className={`relative  rounded-lg m-1 h-[98.2%] w-[90%] bg-gradient-to-t  ${
                      currentKey === Piano.keyId(key, octave) ||
                      chordKeys.some(
                        (chordKey, chordKeyIndex) =>
                          chordKeyIndex !== 0 &&
                          chordKey === Piano.keyId(key, octave)
                      )
                        ? "from-sky-200 to-sky-300"
                        : "from-white to-neutral-50"
                    }`}
                  ></div>
                </div>
              )
          )}
          <div className="absolute left-[56.69px] flex h-[65%] min-w-[502.68px]">
            {newBlackKeys.map((key, i) => (
              <div
                key={"black-keys-" + i + octave}
                id={Piano.keyId(key, octave)}
                onMouseDown={() => selectNote(key, octave)}
                onMouseEnter={() => {
                  if (isMouseDown) selectNote(key, octave);
                }}
                className={`h-full min-w-[38.02px] relative flex justify-center items-end border border-black rounded-b-lg shadow-lg text-white z-20 transition-transform duration-150 ${
                  currentKey === Piano.keyId(key, octave) ||
                  chordKeys.some(
                    (chordKey, chordKeyIndex) =>
                      chordKeyIndex !== 0 &&
                      chordKey === Piano.keyId(key, octave)
                  )
                    ? "bg-sky-300 h-[102.1%] top-0 scale-[0.99]"
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
                    currentKey === Piano.keyId(key, octave) ||
                    chordKeys.some(
                      (chordKey, chordKeyIndex) =>
                        chordKeyIndex !== 0 &&
                        chordKey === Piano.keyId(key, octave)
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
