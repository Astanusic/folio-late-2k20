import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import EE from "./Utils/EventEmitter";
import Loaders from "./Utils/Loader";
import CANNON from "cannon";

export default class App {
  constructor(_options) {
    this.canvas = _options.canvas;
    this.scene = new THREE.Scene();
    this.world = new CANNON.World();

    this.sizes = new Sizes();
    this.resize = this.resize.bind(this);
    EE.on("global:resize", this.resize);

    this.setRenderer();
    this.setCamera();
    this.setTestPlane();
    this.setPlayer();
    this.animate();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.sizes.viewport.width,
      this.sizes.viewport.height
    );
    this.renderer.shadowMap.enabled = true;
  }

  setCamera() {
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      scene: this.scene,
    });

    this.scene.add(this.camera.container);
  }

  setTestPlane() {
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.gravity.set(0, -10, 0);

    this.groundShape = new CANNON.Plane();
    this.groundBody = new CANNON.Body({ mass: 0 });
    this.groundBody.addShape(this.groundShape);
    this.groundBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );
    this.world.addBody(this.groundBody);

    this.planeMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10000, 10000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    this.planeMesh.receiveShadow = true;
    console.log("plane mesh", this.planeMesh);
    this.planeMesh.rotation.x = -Math.PI / 2;

    this.grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    this.grid.material.opacity = 0.2;
    this.grid.material.transparent = true;
    // this.scene.add(this.grid);

    this.ambLight = new THREE.AmbientLight();
    this.scene.add(this.planeMesh);
    this.scene.add(this.ambLight);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.hemiLight.position.set(0, 200, 0);
    this.scene.add(this.hemiLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff);
    this.dirLight.position.set(100, 300, 200);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.top = 180;
    this.dirLight.shadow.camera.bottom = -100;
    this.dirLight.shadow.camera.left = -120;
    this.dirLight.shadow.camera.right = 120;
    this.scene.add(this.dirLight);

    this.helper = new THREE.CameraHelper(this.dirLight.shadow.camera);
    this.scene.add(this.helper);

    // this.scene.fog = new THREE.Fog(0xa0a0a0, 500, 1000);
    this.scene.background = new THREE.Color(0xa0a0a0);

    // this.cubeMesh = new THREE.Mesh(
    //   new THREE.BoxBufferGeometry(1, 1, 1),
    //   new THREE.MeshPhongMaterial({ color: "lightcoral" })
    // );
    // this.scene.add(this.cubeMesh);
  }

  setPlayer() {
    const loaders = new Loaders({
      scene: this.scene,
      name: "Character",
      anims: ["Run", "Standard-Walk"],
      world: this.world,
    });
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
