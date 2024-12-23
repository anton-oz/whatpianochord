import { useState } from "react";
import { usePianoContext } from "../../context/PianoContext";

export default function Piano({ octaves }: { octaves: number }) {
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const { keys, blackKeys, keyId } = usePianoContext();

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
              className={`w-[50px] flex justify-center items-end border border-black rounded-b-lg shadow-lg ${
                currentKey === keyId(key, octave) ? "bg-sky-200" : "bg-white"
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
            className={`relative flex justify-center items-end h-full w-[7%] bg-black rounded-b-lg shadow-lg text-white ${
              currentKey === keyId(key, octave) ? "bg-sky-300" : "bg-black"
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
