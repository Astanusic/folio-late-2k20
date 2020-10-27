import EE from "./EventEmitter";

export default class Sizes {
  constructor() {
    this.viewport = {};
    this.sizeViewport = document.createElement("div");
    this.sizeViewport.style.width = "100w";
    this.sizeViewport.style.height = "100vh";
    this.sizeViewport.style.position = "absolute";
    this.sizeViewport.style.top = "0";
    this.sizeViewport.style.left = "0";
    this.sizeViewport.style.left = "0";
    this.sizeViewport.style.pointerEvents = "none";

    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);

    this.resize();
  }
  resize() {
    document.body.appendChild(this.sizeViewport);
    this.viewport.width = this.sizeViewport.offsetWidth;
    this.viewport.height = this.sizeViewport.offsetHeight;
    document.body.removeChild(this.sizeViewport);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    EE.emit("global:resize", this.width, this.height);
  }
}
