import { useState, useEffect, Dispatch } from "react";
import PianoEngine from "../../utils/PianoEngine";

export default function KeyPicker({
  currentKey,
  selectKey,
  selectChord,
}: {
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  selectChord: (chord: string | null) => void;
}) {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const Piano = new PianoEngine();
  const keys = Piano.getKeys();

  const selectButton = (id: number) => {
    if (selectedButton === id) {
      setSelectedButton(null);
      selectKey(null);
      selectChord(null);
      return;
    }
    setSelectedButton(id);
  };

  useEffect(() => {
    if (currentKey) {
      const selectedKey =
        currentKey[1] !== "#" ? currentKey[0] : currentKey[0] + currentKey[1];
      const selectedKeyIndex = keys.indexOf(selectedKey);
      setSelectedButton(selectedKeyIndex);
      return;
    }
    setSelectedButton(null);
  }, [currentKey]);

  return (
    <div className="w-[33%] flex flex-col justify-center items-center">
      <p className="text-2xl text-semibold">
        Pick a key to start building a chord:{" "}
      </p>
      <div className="w-[75%] flex flex-wrap justify-center ">
        {keys.map((key, i) => (
          <button
            key={i}
            id={`${key}-button`}
            onClick={() => selectButton(i)}
            className={`rounded-lg px-2 py-0 m-1 mb-3 w-fit text-xl font-semibold hover:bg-sky-300 transition-all duration-75 bg-opacity-75 border-b-2  border-r-2  border-opacity-0 ${
              selectedButton === i
                ? "bg-gradient-to-br from-emerald-400 to-sky-500 text-white hover:text-black border-black border-opacity-100"
                : "bg-sky-100 border-r-sky-100 border-b-sky-100"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
