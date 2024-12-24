import { useState, useEffect } from "react";
import { usePianoContext } from "../../context/PianoContext";
import chordBuilder from "./utils";

export default function Piano({ octaves }: { octaves: number }) {
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [chordKeys, setChordKeys] = useState<(string | null)[]>([]);
  /* 
    ^ state for for selected keys or chords ^
  */

  const { keys, blackKeys, keyId, selectedChord, chords } = usePianoContext();
  /*
    ! TODO ! ^ switch context to part of utility field ^
  */

  useEffect(() => {
    const chord = chordBuilder(currentKey, keys, selectedChord, chords, keyId);
    if (chord === undefined) {
      console.log("chord is undefined");
      return;
    }
    setChordKeys(chord);
  }, [currentKey, selectedChord]);

  const selectNote = (key: string, octave: number) => {
    const id = keyId(key, octave);
    if (id === currentKey) {
      setCurrentKey(null);
      return;
    }
    setCurrentKey(id);
  };

  // how many octaves to render
  const renderNum = [];
  for (let i = 0; i < octaves; i++) {
    renderNum.push(i);
  }

  return renderNum.map((_, octave) => (
    <div
      key={"piano-container-" + octave}
      className="w-[350px] h-[140px] flex relative space-x-[0.5px] mx-[0.25px]"
    >
      {keys.map(
        (key, i) =>
          key[1] !== "#" && (
            <div
              key={"white-keys-" + i + octave}
              id={keyId(key, octave)}
              onClick={() => {
                selectNote(key, octave);
              }}
              className={`w-[50px] flex justify-center items-end border border-black rounded-b-lg shadow-lg z-10 ${
                currentKey === keyId(key, octave) ? "bg-sky-200" : ""
              } ${
                chordKeys !== null &&
                chordKeys.some(
                  (chordKey, chordKeyIndex) =>
                    chordKeyIndex !== 0 && chordKey === keyId(key, octave)
                )
                  ? "bg-sky-200"
                  : ""
              }`}
            ></div>
          )
      )}
      <div className="absolute flex h-[65%] w-[350px] space-x-[0.5px]">
        {blackKeys.map((key, i) => (
          <div
            key={"black-keys-" + i + octave}
            id={keyId(key, octave)}
            onClick={() => {
              selectNote(key, octave);
            }}
            className={`relative flex justify-center items-end h-full w-[7%] bg-black border border-black rounded-b-lg shadow-lg text-white z-20 ${
              currentKey === keyId(key, octave) ? "bg-sky-300" : ""
            }${
              chordKeys !== null &&
              chordKeys.some(
                (chordKey, chordKeyIndex) =>
                  chordKeyIndex !== 0 && chordKey === keyId(key, octave)
              )
                ? "bg-sky-300"
                : ""
            }`}
            style={{
              left: `${
                i === 2 || i === 3 || i === 4
                  ? 8 * (i + 1) - i + 17.3
                  : 8 * (i + 1) - i + 2.75
              }%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  ));
}
