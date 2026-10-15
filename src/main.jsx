import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Iphone } from "./index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Iphone />
  </StrictMode>,
);