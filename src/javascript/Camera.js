import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import EE from "./Utils/EventEmitter";

export default class Camera {
  constructor(_options) {
    this.sizes = _options.sizes;
    this.renderer = _options.renderer;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      40,
      this.sizes.viewport.width / this.sizes.viewport.height,
      1,
      80
    );
    this.instance.position.y = 5;
    this.instance.up.set(0, 0, 1);
    this.container.add(this.instance);

    EE.on("global:resize", (width, height) => {
      this.instance.aspect = width / height;
      this.instance.updateProjectionMatrix();
    });
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(
      this.instance,
      this.renderer.domElement
    );
  }
}
