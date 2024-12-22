import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PianoProvider } from "./context/PianoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PianoProvider>
      <App />
    </PianoProvider>
  </StrictMode>
);
