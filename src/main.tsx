import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./Context/themeContext.tsx";
import { PianoContextProvider } from "./Context/PianoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <PianoContextProvider>
        <App />
      </PianoContextProvider>
    </ThemeProvider>
  </StrictMode>
);
