import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AtmosphericTemperatureCalculator } from "./screens/AtmosphericTemperatureCalculator/AtmosphericTemperatureCalculator";
import { AtmosphericGasDetail } from "./screens/AtmosphericGasDetail/AtmosphericGasDetail";
import { TemperatureCalculation } from "./screens/TemperatureCalculation/TemperatureCalculation";
import { CartProvider } from "./contexts/CartContext";
import "./index.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AtmosphericTemperatureCalculator />} />
          <Route path="/atmospheric-gas/:id" element={<AtmosphericGasDetail />} />
          <Route path="/temperature-calculation" element={<TemperatureCalculation />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
