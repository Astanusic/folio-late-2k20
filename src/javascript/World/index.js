import * as THREE from "three";
import Physics from "./Physics";
import Floor from "./Floor";
import Ninja from "./Ninja";

export default class {
  constructor(_options) {
    this.time = _options.time;
    this.sizes = _options.sizes;
    this.camera = _options.camera;
    this.renderer = _options.renderer;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.setPhysics();
    this.setFloor();
    this.setNinja();
  }

  setFloor() {
    this.floor = new Floor({
      physics: this.physics,
    });

    this.container.add(this.floor.container);
  }

  setPhysics() {
    this.physics = new Physics({
      time: this.time,
      sizes: this.sizes,
    });
  }

  setNinja() {
    this.ninja = new Ninja({
      physics: this.physics,
      time: this.time,
      camera: this.camera,
      renderer: this.renderer,
    });

    this.container.add(this.ninja.container);
  }
}
