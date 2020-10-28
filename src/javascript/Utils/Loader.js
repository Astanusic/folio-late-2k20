import EE from "./EventEmitter";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export default class Loaders {
  constructor() {
    this.setLoaders();
  }

  setLoaders() {
    this.loaders = [];
  }
}
