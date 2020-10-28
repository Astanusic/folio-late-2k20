import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import EE from "./Utils/EventEmitter";

export default class Camera {
  constructor(_options) {
    this.sizes = _options.sizes;
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
      40,
      this.sizes.viewport.width / this.sizes.viewport.height,
      1,
      80
    );
    this.instance.position.y = 5;
    this.instance.position.z = 15;
    this.container.add(this.instance);
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(
      this.instance,
      this.renderer.domElement
    );
    console.log(this.renderer);
  }

  resize(width, height) {
    this.instance.aspect = width / height;
    this.instance.updateProjectionMatrix();
    console.log("resized from camera class");
  }
}
