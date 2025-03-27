import { useState, useEffect } from "react";

import ScreenToggle from "./components/ScreenToggle";
import ScreenContent from "./components/ScreenContent";
import { usePianoContext } from "../../../Context/PianoContext";

export default function Screen() {
  const [screenOn, setScreenOn] = useState<boolean>(true);

  const { resetScreenToInit } = usePianoContext();

  useEffect(() => {
    if (!screenOn) {
      resetScreenToInit();
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
