import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import EE from "./Utils/EventEmitter";

export default class App {
  constructor(_options) {
    this.canvas = _options.canvas;
    this.scene = new THREE.Scene();

    this.sizes = new Sizes();
    this.resize = this.resize.bind(this);
    EE.on("global:resize", this.resize);

    this.setRenderer();
    this.setCamera();
    this.setTestPlane();
    this.animate();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });

    this.renderer.setPixelRatio(2);
    this.renderer.setSize(
      this.sizes.viewport.width,
      this.sizes.viewport.height
    );
  }

  setCamera() {
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
    });

    this.scene.add(this.camera.container);
  }

  setTestPlane() {
    this.planeMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000, 32, 32),
      new THREE.MeshNormalMaterial()
    );
    this.planeMesh.position.y = -5;
    this.planeMesh.rotation.x = -Math.PI / 2;

    this.light = new THREE.AmbientLight();
    this.scene.add(this.planeMesh);
    this.scene.add(this.light);

    this.cubeMesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({ color: "lightcoral" })
    );
    this.scene.add(this.cubeMesh);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera.instance);
  }

  resize(width, height) {
    this.renderer.setSize(width, height);
    console.log("resized from App class");
  }
}
