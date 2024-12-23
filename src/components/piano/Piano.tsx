import { useState, useEffect } from "react";
import { usePianoContext } from "../../context/PianoContext";

export default function Piano({ octaves }: { octaves: number }) {
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const [chordKeys, setChordKeys] = useState<(string | null)[]>([]);

  const { keys, blackKeys, keyId, selectedChord, chords } = usePianoContext();

  useEffect(() => {
    const currentKeyOctave = currentKey
      ? currentKey[1] === "#"
        ? parseInt(currentKey[3])
        : parseInt(currentKey[2])
      : null;
    const currentKeyWithoutOctaveId = currentKey
      ? currentKey[1] === "#"
        ? currentKey[0] + currentKey[1]
        : currentKey[0]
      : null;
    let currentKeyIndex = keys.findIndex(
      (key) => key === currentKeyWithoutOctaveId
    );

    if (selectedChord !== null && chords[selectedChord] === "major") {
      const majorThird = 4;
      const minorThird = 3;

      const majorThirdIndex = (currentKeyIndex + majorThird) % keys.length;
      const minorThirdIndex = (majorThirdIndex + minorThird) % keys.length;

      let majorThirdKeyId = currentKeyOctave
        ? keyId(keys[majorThirdIndex], currentKeyOctave - 1)
        : null;
      let minorThirdKeyId = currentKeyOctave
        ? keyId(keys[minorThirdIndex], currentKeyOctave - 1)
        : null;

      if (currentKeyOctave) {
        if (currentKeyIndex > majorThirdIndex) {
          majorThirdKeyId = keyId(keys[majorThirdIndex], currentKeyOctave);
        }
        if (currentKeyIndex > minorThirdIndex) {
          minorThirdKeyId = keyId(keys[minorThirdIndex], currentKeyOctave);
        }
      }

      const majorChord = [currentKey, majorThirdKeyId, minorThirdKeyId];
      setChordKeys(majorChord);
      return;
    } else {
      setChordKeys([]);
      if (!selectedChord) {
        console.log("no chord selected\n");
        return;
      }
      console.log("unsupported chord type");
    }
  }, [currentKey, selectedChord]);

  useEffect(() => {
    console.log(chordKeys);
  }, [chordKeys]);

  const logKey = (key: string, octave: number) => {
    console.log(key + "-" + (octave + 1));
  };

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
                console.log(keyId(key, octave));
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
            className={`relative flex justify-center items-end h-full w-[7%] bg-black rounded-b-lg shadow-lg text-white z-20 ${
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
