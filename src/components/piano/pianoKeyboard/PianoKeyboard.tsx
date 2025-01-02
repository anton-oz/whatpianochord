import { useState, useEffect, Dispatch } from "react";
import PianoEngine from "../utils/RefactorEngine";

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
  // const [currentKey, updateCurrentKey] = useState<string | null>(null);
  /* ^ change out chordKeys for currentKeys ^ */
  const [chordKeys, setChordKeys] = useState<(string | null)[]>([]);
  /* 
    ^ state for for selected keys or chords ^
  */

  // const { keys, blackKeys, keyId, selectedChord, chords } = usePianoContext();
  /*
    ! TODO ! ^ switch context to part of utility field ^
  */

  const Piano = new PianoEngine();
  // Piano Keys arrays
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
      newChords.find((chord) => chord === currentChord) as string // this is not safe to do, but temp fix
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

  // how many octaves to render
  // const renderNum: number[] = [];
  // for (let i = 0; i < octaves; i++) {
  //   renderNum.push(i);
  // }

  return octaves.map((_, octave) => (
    <div
      key={"piano-container-" + octave}
      className="w-[350px] h-[140px] flex relative space-x-[0.5px] mx-[0.25px]"
    >
      {newKeys.map(
        (key, i) =>
          key[1] !== "#" && (
            <div
              key={"white-keys-" + i + octave}
              id={Piano.keyId(key, octave)}
              onClick={() => {
                selectNote(key, octave);
              }}
              className={`w-[50px] flex justify-center items-end border border-black rounded-b-lg shadow-lg z-10 ${
                currentKey === Piano.keyId(key, octave) ? "bg-sky-200" : ""
              } ${
                chordKeys !== null &&
                chordKeys.some(
                  (chordKey, chordKeyIndex) =>
                    chordKeyIndex !== 0 && chordKey === Piano.keyId(key, octave)
                )
                  ? "bg-sky-200"
                  : ""
              }`}
            ></div>
          )
      )}
      <div className="absolute flex h-[65%] w-[350px] space-x-[0.5px]">
        {newBlackKeys.map((key, i) => (
          <div
            key={"black-keys-" + i + octave}
            id={Piano.keyId(key, octave)}
            onClick={() => {
              selectNote(key, octave);
            }}
            className={`relative flex justify-center items-end h-full w-[7%] bg-black border border-black rounded-b-lg shadow-lg text-white z-20 ${
              currentKey === Piano.keyId(key, octave) ? "bg-sky-300" : ""
            }${
              chordKeys !== null &&
              chordKeys.some(
                (chordKey, chordKeyIndex) =>
                  chordKeyIndex !== 0 && chordKey === Piano.keyId(key, octave)
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
