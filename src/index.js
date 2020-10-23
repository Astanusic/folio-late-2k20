import * as THREE from "three";
import { ObitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import "./style/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  window.game = game; // Debug
});

class Game {
  constructor() {
    this.sizes = {};
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00aaff });
    this.cube = new THREE.Mesh(geometry, material);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    const ambient = new THREE.AmbientLight(0x707070);

    this.scene.add(this.cube);
    this.scene.add(light);
    this.scene.add(ambient);

    this.camera.position.z = 3;

    this.animate();
    this.onWindowResize();
  }

  animate() {
    const game = this;
    requestAnimationFrame(() => game.animate());

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const { sizes, camera, renderer } = this;
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    window.addEventListener("resize", () => {
      // save sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      //  Update Camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      //  Update Renderer
      renderer.setSize(sizes.width, sizes.height);
    });
  }
}
