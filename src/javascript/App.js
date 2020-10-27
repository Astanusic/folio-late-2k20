import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import EE from "./Utils/EventEmitter";

export default class App {
  constructor(_options) {
    this.canvas = _options.canvas;

    this.sizes = new Sizes();

    this.setRenderer();
    this.setCamera();
    this.setTestPlane();
  }

  setRenderer() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });

    this.renderer.setPixelRatio(1);
    this.renderer.setSize(
      this.sizes.viewport.width,
      this.sizes.viewport.height
    );

    EE.on("global:resize", (width, height) => {
      this.renderer.setSize(width, height);
    });
  }

  setCamera() {
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      renderer: this.renderer,
    });

    this.scene.add(this.camera.container);
  }

  setTestPlane() {
    this.planeMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000, 1, 1),
      new THREE.MeshPhongMaterial({ color: "lightcoral" })
    );
    this.planeMesh.position.y = -5;
    this.planeMesh.rotation.x = -Math.PI / 2;

    this.light = new THREE.AmbientLight();
    this.scene.add(this.planeMesh, this.light);
  }
}
