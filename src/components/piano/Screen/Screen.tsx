import { useState, useEffect } from "react";

import ScreenToggle from "./components/ScreenToggle";
import ScreenContent from "./components/ScreenContent";
import { usePianoContext } from "../../../Context/PianoContext";

export default function Screen() {
  const [screenOn, setScreenOn] = useState<boolean>(true);

  const PianoContext = usePianoContext();

  useEffect(() => {
    if (!screenOn) {
      PianoContext.resetToInitialState();
    }
    return;
  }, [screenOn]);

  return (
    <>
      <ScreenToggle screenOn={screenOn} setScreenOn={setScreenOn} />
      <ScreenContent screenOn={screenOn} />
    </>
  );
}
