import "./style/main.css";
import App from "./javascript/App";

document.addEventListener("DOMContentLoaded", () => {
  const application = new App({
    canvas: document.querySelector(".js-canvas"),
  });
  window.application = application; // Debug
});
