import { useState, useEffect } from "react";
import PianoEngine from "../PianoEngine";

export default function KeyPicker({
  currentKey,
}: {
  currentKey: string | null;
}) {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const Piano = new PianoEngine();
  const keys = Piano.getKeys();

  const selectButton = (id: number) => {
    if (selectedButton === id) {
      setSelectedButton(null);
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
            className={`border-2 border-black rounded-lg px-2 m-1 w-fit  ${
              selectedButton === i ? "bg-sky-500 text-white" : "bg-slate-150"
              // selectButton(i)
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
