import React, { useState, useEffect } from "react";

import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";

import Screen from "./Screen/Screen";

import { usePianoContext } from "../../Context/PianoContext";

export default function Piano() {
  const boxStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
    backgroundClip: "padding-box",
  };

  const PianoContext = usePianoContext();

  const { octaves } = PianoContext;

  // FOR SCALE
  //
  const [scale, setScale] = useState(1); // Initial scale value
  //     previousScale is for smooth transitions when changing amount of octaves rendered
  // const [_, setPreviousScale] = useState(1); // for smooth transitions
  //
  const calculateScale = () => {
    // setPreviousScale(scale);
    // Example: Adjust the scale based on window width
    const minWidth = 500; // Minimum width for scaling
    const maxWidth = 1920; // Maximum width for scaling
    const minScale = 0.2; // Minimum scale value
    const maxScale = window.innerWidth / (520 * octaves + octaves); // Maximum scale value

    const clampedWidth = Math.min(
      Math.max(window.innerWidth, minWidth),
      maxWidth
    );

    const newScale =
      minScale +
      ((clampedWidth - minWidth) / (maxWidth - minWidth)) *
        (maxScale - minScale);

    setScale(newScale);
    console.log("rerender");
  };

  useEffect(() => {
    // Calculate the initial scale and listen for resize events
    let timeout: any = false;
    const timeoutLength = 250;
    calculateScale();
    const debounceResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        calculateScale();
      }, timeoutLength);
    };
    window.addEventListener("resize", debounceResize);
    //
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [octaves]);

  return (
    <>
      <div
        className={`flex flex-col p-4 pl-2 pt-2 pr-[0.75rem] border-t border-black bg-black bg-opacity-100 rounded-lg`}
        style={{
          transition: "0.4s ease-in-out",
          transform: `scale(${scale})`,
        }}
      >
        <div
          className="m-0 min-h-[300px] max-h-[300px] bg-zinc-700 w-full"
          style={boxStyle}
        >
          <Screen />
        </div>
        <div className="h-[20px] w-full bg-gradient-to-br from-[#e67255] to-[#ce9060] border-b border-black"></div>
        <div className="max-w-full`">
          <PianoKeyboard />
        </div>
      </div>
    </>
  );
}
