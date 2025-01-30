import { useState, useEffect } from "react";

import ScreenToggle from "./components/ScreenToggle";
import ScreenContent from "./components/ScreenContent";
import { pianoProps } from "../Piano.tsx";

export default function Screen(pianoProps: pianoProps) {
  const [screenOn, setScreenOn] = useState<boolean>(true);

  useEffect(() => {
    if (!screenOn) {
      pianoProps.resetToInitalState();
    }
    return;
  }, [screenOn]);

  return (
    <>
      <ScreenToggle screenOn={screenOn} setScreenOn={setScreenOn} />
      <ScreenContent screenOn={screenOn} pianoProps={pianoProps} />
    </>
  );
}
