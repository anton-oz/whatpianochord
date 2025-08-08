import { useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "./utils";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkmode, setDarkMode] = useState(false);
  const [modeChange, setModeChange] = useState(false);

  const toggleChange = () => {
    setModeChange((modeChange) => !modeChange);
  };

  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (darkTheme) {
      if (darkTheme.matches) {
        setDarkMode(true);
        return;
      }
      setDarkMode(false);
      return;
    }
  }, [modeChange, darkTheme]);

  useEffect(() => {
    darkTheme.onchange = toggleChange;
    return () => {
      darkTheme.onchange = null;
    };
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={darkmode}>{children}</ThemeContext.Provider>
  );
}
