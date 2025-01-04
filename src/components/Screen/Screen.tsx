import { useState } from "react";

import ScreenToggle from "./components/ScreenToggle";
import ScreenContent from "./components/ScreenContent";

export default function Screen() {
  const [screenOn, setScreenOn] = useState<boolean>(true);
  return (
    <>
      <ScreenToggle screenOn={screenOn} setScreenOn={setScreenOn} />
      <ScreenContent screenOn={screenOn} />
    </>
  );
}
