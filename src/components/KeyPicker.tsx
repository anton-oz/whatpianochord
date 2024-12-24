import { useState } from "react";
import { usePianoContext } from "../context/PianoContext";

export default function KeyPicker() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const { keys  } = usePianoContext();

  const selectButton = (id: number) => {
    if (selectedButton === id) {
      return "bg-sky-500 text-white";
    }
    return "bg-slate-150";
  };

  return (
    <div className="w-[33%] flex flex-col justify-center items-center">
      <p className="text-2xl text-semibold">
        Pick a key to start building a chord:{" "}
      </p>
      <div className="w-[75%] flex flex-wrap justify-center ">
        {keys.map((key, i) => (
          <button
            key={i}
            id={`button-${i}`}
            onClick={() => setSelectedButton(i)}
            className={`border-2 border-black rounded-lg px-2 m-1 w-fit  ${
              // selectedButton === i ? "bg-sky-500 text-white" : "bg-slate-150"
              selectButton(i)
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
