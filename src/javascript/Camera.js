import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import EE from "./Utils/EventEmitter";

export default class Camera {
  constructor(_options) {
    this.sizes = _options.sizes;
    this.time = _options.time;
    this.renderer = _options.renderer;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.resize = this.resize.bind(this);
    EE.on("global:resize", this.resize);

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.viewport.width / this.sizes.viewport.height,
      1,
      5000
    );
    this.instance.position.set(100, 400, 400);
    this.container.add(this.instance);
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(
      this.instance,
      this.renderer.domElement
    );
    this.orbitControls.target.set(0, 100, 0);
    console.log(this.orbitControls);
  }

  resize(width, height) {
    this.instance.aspect = width / height;
    this.instance.updateProjectionMatrix();
  }
}
