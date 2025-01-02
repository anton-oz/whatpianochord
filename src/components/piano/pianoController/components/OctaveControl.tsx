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
    <div className="w-[31%] space-x-4">
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
  );
}
