import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AtmosphereCalculator } from "./screens/AtmosphereCalculator/AtmosphereCalculator";
import "./index.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AtmosphereCalculator />
  </StrictMode>,
);
