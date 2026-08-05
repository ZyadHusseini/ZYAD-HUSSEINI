import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Self-hosted so fonts are same-origin: no third-party DNS/TLS handshake and no
// render-blocking stylesheet from fonts.googleapis.com.
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
