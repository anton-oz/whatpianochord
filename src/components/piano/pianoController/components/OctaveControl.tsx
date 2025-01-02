import { Dispatch } from "react";

export default function OctaveControl({
  octaves,
  setOctaves,
}: {
  octaves: number[];
  setOctaves: Dispatch<number[]>;
}) {
  const increase = () => {
    if (octaves.length === 4) return;
    setOctaves([...octaves, octaves[octaves.length - 1] + 1]);
  };
  const decrease = () => {
    if (octaves.length === 1) return;
    setOctaves(octaves.slice(0, octaves.length - 1));
  };
  return (
    <div className="w-[33%] flex flex-col justify-center items-center">
      <h3 className="w-full text-center">octaves: {octaves.length}</h3>
      <div className="flex justify-center w-full">
        <button
          className="px-3 border border-black rounded"
          onClick={() => increase()}
        >
          +
        </button>
        <button
          className="px-3 border border-black rounded"
          onClick={() => decrease()}
        >
          -
        </button>
      </div>
      {octaves.length === 1 ? (
        <p className="text-red-500">lowest amount of octaves allowed</p>
      ) : null}
      {octaves.length === 4 ? (
        <p className="text-red-600">highest amount of octaves allowed</p>
      ) : null}
    </div>
  );
}
