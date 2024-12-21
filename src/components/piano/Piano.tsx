import { useEffect, useState } from "react";
import { usePianoContext } from "@/context/PianoContext";

export default function Piano({ keyAttr }: { keyAttr: number }) {
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const { keys, blackKeys } = usePianoContext();

  const logKey = (key: string) => {
    console.log(key + "-" + (keyAttr + 1));
  };

  const keyId = (key: string, keyOctave: number) => {
    return `${key}-${keyOctave + 1}`;
  };

  const selectNote = (key: string) => {
    const id = keyId(key, keyAttr);
    if (id === currentKey) {
      setCurrentKey(null);
      return;
    }
    setCurrentKey(id);
  };

  return (
    <div
      key={"piano-container-" + keyAttr}
      className="w-[350px] h-[140px] flex relative space-x-[0.5px] mx-[0.25px]"
    >
      {keys.map(
        (key, i) =>
          key[1] !== "#" && (
            <div
              key={"white-keys-" + i + keyAttr}
              id={keyId(key, keyAttr)}
              onClick={() => {
                // setCurrentKey(keyId(key, keyAttr));
                selectNote(key);
                logKey(key);
              }}
              className={`w-[50px] flex justify-center items-end border border-black rounded-b-lg shadow-lg ${
                currentKey === keyId(key, keyAttr)
                  ? "bg-emerald-200"
                  : "bg-white"
              }`}
            ></div>
          )
      )}
      <div className="absolute flex h-[65%] w-[350px] space-x-[0.5px]">
        {blackKeys.map((key, i) => (
          <div
            key={"black-keys-" + i + keyAttr}
            id={keyId(key, keyAttr)}
            onClick={() => {
              // setCurrentKey(keyId(key, keyAttr));
              selectNote(key);
              console.log(keyId(key, keyAttr));
            }}
            className={`relative flex justify-center items-end h-full w-[7%] bg-black rounded-b-lg shadow-lg text-white ${
              currentKey === keyId(key, keyAttr) ? "bg-emerald-200" : "bg-black"
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
  );
}
