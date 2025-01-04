import { Dispatch } from "react";

import { Plus, Minus } from "lucide-react";

export default function OctaveControl({
  octaves,
  setOctaves,
}: {
  octaves: number[] | undefined;
  setOctaves: Dispatch<number[]> | undefined;
}) {
  const increase = () => {
    if (!octaves || !setOctaves) return;
    if (octaves.length === 4) return;
    setOctaves([...octaves, octaves[octaves.length - 1] + 1]);
  };
  const decrease = () => {
    if (!octaves || !setOctaves) return;
    if (octaves.length === 2) return;
    setOctaves(octaves.slice(0, octaves.length - 1));
  };
  return (
    <div
      aria-disabled
      className="w-[250px] flex flex-col justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className={`w-full text-center text-2xl`}>
          octaves:{" "}
          <span
            className={`${
              octaves?.length === 2 || octaves?.length === 4
                ? "text-red-500"
                : ""
            }`}
          >
            {" "}
            {octaves ? octaves.length : ""}
          </span>
        </h3>
        <div className="flex justify-center items-center w-full space-x-2 p-2">
          <button
            onClick={() => increase()}
            className="rounded-lg px-2 py-1 m-1 mb-3 w-fit text-xl font-semibold hover:bg-sky-300 bg-sky-300 bg-opacity-75 border-b-2  border-r-2  border-opacity-0 transition-all duration-150"
          >
            <Plus
              className="text-white hover:text-gray-400"
              size={20}
              strokeWidth={2}
            />
          </button>
          <button
            onClick={() => decrease()}
            className="rounded-lg px-2 py-1 m-1 mb-3 w-fit text-xl font-semibold hover:bg-sky-300 bg-sky-300 bg-opacity-75 border-b-2  border-r-2  border-opacity-0 transition-all duration-150"
          >
            <Minus
              className="text-white hover:text-gray-400"
              size={20}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
      <div>starting octave</div>
    </div>
  );
}
