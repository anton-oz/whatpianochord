import { useEffect, useState, useRef } from "react";
import { usePianoContext } from "@/Context/utils";
import PianoKeyboard from "./pianoKeyboard/PianoKeyboard";
import Screen from "./Screen/Screen";

export default function Piano() {
  const { pianoColors, octaves } = usePianoContext();
  const colorOne = pianoColors[0];
  const colorTwo = pianoColors[1];
  // NOTE: background color of piano.
  const boxStyle = {
    display: "inline-block",
    // backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
    backgroundImage: `linear-gradient(to right, ${colorOne}, ${colorTwo})`,
    backgroundClip: "padding-box",
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let hue = 0;
    const saturation = max - min;
    if (max !== min) {
      if (max === r) {
        hue = (g - b) / saturation;
      } else if (max === g) {
        hue = 2.0 + (b - r) / saturation;
      } else {
        hue = 4.0 + (r - g) / saturation;
      }
      hue *= 60;
    }
    const lightness = (max + min) / 2;
    return [hue, saturation, lightness];
  };

  const ColorLuminance = (hex: string, lumFactor: number) => {
    const rgb = hexToRgb(hex);
    if (!rgb) {
      console.error("ERROR: error converting hex to rgb");
      return;
    }
    const hslArr = rgbToHsl(rgb);
    for (const number in hslArr) {
      hslArr[number] = Number(hslArr[number].toPrecision(3));
    }
    const [h, s, l] = hslArr;
    const hsl = `hsl(${h} ${s * 100}% ${l * 100 * lumFactor}%)`;
    return hsl;
  };

  const luminanceFactor = 0.7;
  const lowerPianoColorOne = ColorLuminance(colorOne, luminanceFactor);
  const lowerPianoColorTwo = ColorLuminance(colorTwo, luminanceFactor);

  const lowerBoxStyle = {
    backgroundImage: `linear-gradient(45deg, ${lowerPianoColorOne}, 50%, ${lowerPianoColorTwo})`,
  };

  const [scale, setScale] = useState(1); // Initial scale value

  useEffect(() => {
    const handleSetScale = () => {
      const screenX = document.body.clientWidth;
      let newScale = screenX / 2500;
      if (pianoRef.current) {
        const pianoWidth = pianoRef.current.clientWidth;
        if (pianoWidth > screenX) newScale = screenX / 3500;
      }
      setScale(newScale);
    };

    handleSetScale();

    let debounce = true;
    const length = 500;

    const handleResize = (/* e: UIEvent */) => {
      if (debounce) {
        setTimeout(() => {
          debounce = true;
          handleSetScale();
        }, length);

        debounce = false;
      }
    };

    // TODO: Need to add event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [octaves]);

  const pianoRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        className={`flex flex-col p-4 pl-2 pt-2 pr-[0.75rem] border-t border-black bg-black bg-opacity-100 rounded-lg`}
        style={{
          transition: "0.4s ease-in-out",
          transform: `scale(${scale})`,
        }}
        ref={pianoRef}
      >
        <div
          className="m-0 min-h-[300px] max-h-[300px] bg-zinc-700 w-full place-items-center pt-5"
          style={boxStyle}
        >
          <Screen />
        </div>
        <div
          className={`h-[20px] w-full border-b border-black`}
          style={lowerBoxStyle}
        ></div>
        <div className="max-w-full`">
          <PianoKeyboard />
        </div>
      </div>
    </>
  );
}
