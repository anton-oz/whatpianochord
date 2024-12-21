import { Fragment } from "react";

export default function Piano({
  keyAttr,
  keys,
}: {
  keyAttr: number;
  keys: string[];
}) {
  const blackKeys = ["C#", "D#", "F#", "G#", "A#"];

  const fullPiano = [];

  let index = 9;
  while (fullPiano.length < 88) {
    fullPiano.push(keys[index]);
    index = (index + 1) % keys.length;
  }

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
              className="w-[50px] flex justify-center items-end border border-black rounded-b-lg shadow-lg"
            >
              {/* {key} */}
            </div>
          )
      )}
      <div className="absolute flex h-[65%] w-[350px] space-x-[0.5px]">
        {blackKeys.map((key, i) => (
          <div
            key={"black-keys-" + i + keyAttr}
            className="relative flex justify-center items-end h-full w-[7%] bg-black rounded-b-lg shadow-lg text-white"
            style={{
              left: `${
                i === 2 || i === 3 || i === 4
                  ? 8 * (i + 1) - i + 17.3
                  : 8 * (i + 1) - i + 2.75
              }%`,
            }}
          >
            {/* {key} */}
          </div>
        ))}
      </div>
    </div>
  );
}
