import { usePianoContext } from "@/Context/PianoContext";
import { Settings, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
export default function Modal({
  showModal,
  modalName,
  toggleModal,
}: {
  showModal: boolean;
  modalName: string;
  toggleModal: () => void;
}) {
  const { pianoColors, setPianoColors } = usePianoContext();
  const [colorOne, setColorOne] = useState(pianoColors[0]);
  const [colorTwo, setColorTwo] = useState(pianoColors[1]);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.dataset.name;
    if (name === "colorOne") {
      setColorOne(value);
    } else {
      setColorTwo(value);
    }
    setPianoColors([colorOne, colorTwo]);
  };

  const colorInputTailwindStyle =
    "appearance-none w-12 h-12 bg-transparent cursor-pointer " +
    "border-none [&::-webkit-color-swatch]:rounded-[50%] " +
    "[&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:border-black";

  return (
    <>
      <div
        className={`absolute flex justify-center items-center h-full w-full bg-[rgb(0,0,0,0.3)] text-white
                    ${showModal ? "z-[1000]  opacity-100" : "opacity-0 -z-50"}`}
        style={{
          backgroundColor: "rgb(0,0,0,0.3)",
        }}
      >
        <div className="relative w-[20%] h-fit flex-col p-4 bg-white border-2 border-black rounded-lg text-black">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center border-b-2 border-black">
              <h3 className="font-bold text-2xl px-2 py-1 w-fit">
                {modalName}
              </h3>
              <Settings />
            </div>

            <X
              size={30}
              onClick={toggleModal}
              className="z-50 cursor-pointer hover:scale-125 transition-all duration-200"
            />
          </div>
          <div className="py-2 px-4">
            {modalName == "Settings" ? (
              <>
                <h4 className="border-2 border-black px-2 py-1 w-fit">
                  Piano Color
                </h4>
                <div className="w-fit h-max flex flex-col justify-center items-center py-2 space-y-2">
                  <div className="flex justify-center items-center">
                    {" "}
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
                </div>
              </>
            ) : (
              <div>login stuff :)</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
