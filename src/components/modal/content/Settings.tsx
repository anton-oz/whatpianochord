import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { usePianoContext } from "@/Context/utils";

export default function Settings() {
  const { pianoColors, setPianoColors, resetToInit } = usePianoContext();
  const [activeOption, setActiveOption] = useState(0);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [colorOne, setColorOne] = useState(pianoColors[0]);
  const [colorTwo, setColorTwo] = useState(pianoColors[1]);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.dataset.name;
    if (name === "colorOne") {
      setColorOne(value);
      setShowSaveButton(true);
    } else {
      setColorTwo(value);
      setShowSaveButton(true);
    }
  };

  const saveChanges = () => {
    setPianoColors([colorOne, colorTwo]);
    setShowSaveButton(false);
  };

  useEffect(() => {
    setColorOne(pianoColors[0]);
    setColorTwo(pianoColors[1]);
  }, [pianoColors]);

  useEffect(() => {
    setColorOne(pianoColors[0]);
    setColorTwo(pianoColors[1]);
    setShowSaveButton(false);
  }, [activeOption, pianoColors]);

  const handleActiveOption = (e: MouseEvent<HTMLHeadingElement>) => {
    if (!(e.target instanceof HTMLHeadingElement) || !e.target.dataset.key)
      return;
    const targetOption = parseInt(e.target.dataset.key);
    setActiveOption(targetOption);
  };

  /* 
    TODO: Move this style to its own defined single style in tailwind.config
  */
  const colorInputTailwindStyle =
    "appearance-none w-20 h-20 bg-transparent [&::-webkit-color-swatch]:cursor-pointer " +
    "border-none [&::-webkit-color-swatch]:rounded-[50%] rounded-[50%] " +
    "[&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:border-black";

  const settingsOpts = ["Piano Color", "Reset to Defaults"];

  return (
    <div className="flex">
      <div className="h-fit flex flex-col border-l-2 border-black">
        {settingsOpts.map((option, i) => (
          <h4
            key={i}
            data-key={i}
            onClick={handleActiveOption}
            className={`px-2 py-1 w-max min-w-full rounded-r-lg cursor-pointer transition-all duration-150
                              ${i === activeOption ? "bg-black text-white" : "bg-zinc-100 hover:bg-zinc-200"}`}
          >
            {option}
          </h4>
        ))}
      </div>

      <div className="py-2 px-4 w-full">
        <div className="h-max flex flex-col justify-center items-center">
          {activeOption === 0 ? (
            <div className="flex justify-center items-center">
              <input
                data-name="colorOne"
                type="color"
                value={colorOne}
                onChange={handleColorChange}
                className={colorInputTailwindStyle}
              />
              <input
                data-name="colorTwo"
                type="color"
                value={colorTwo}
                onChange={handleColorChange}
                className={colorInputTailwindStyle}
              />
            </div>
          ) : activeOption === 1 ? (
            <button
              type="button"
              className="px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-100"
              onClick={resetToInit}
            >
              Reset to default
            </button>
          ) : null}
        </div>
        <button
          type="button"
          className={`absolute top-6 right-24 py-1 px-2 border-2 border-black rounded-lg 
                                ${showSaveButton ? "visible" : "hidden"}`}
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
