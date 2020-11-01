import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import EE from "./Utils/EventEmitter";
import Time from "./Utils/Time";
import * as CANNON from "cannon-es";
import World from "./World/index";

export default class App {
  constructor(_options) {
    this.canvas = _options.canvas;

    this.world = new CANNON.World();

    this.sizes = new Sizes();
    this.time = new Time();
    this.raycaster = new THREE.Raycaster();

    this.loop = this.loop.bind(this);
    this.resize = this.resize.bind(this);
    this.onDocMouseDown = this.onDocMouseDown.bind(this);
    EE.on("global:tick", this.loop);
    EE.on("global:resize", this.resize);

    this.setRenderer();
    this.setCamera();
    this.setLights();
    this.setWorld();

    document.addEventListener("mousedown", this.onDocMouseDown, false);
  }

  setRenderer() {
    this.scene = new THREE.Scene();

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
      scene: this.scene,
      sizes: this.sizes,
      time: this.time,
      renderer: this.renderer,
      scene: this.scene,
    });

    this.scene.add(this.camera.container);
  }

  setWorld() {
    this.world = new World({
      time: this.time,
      sizes: this.sizes,
      camera: this.camera,
      renderer: this.renderer,
    });
    this.scene.add(this.world.container);
  }

  setLights() {
    this.ambLight = new THREE.AmbientLight();
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
  }

  loop() {
    this.renderer.render(this.scene, this.camera.instance);
  }

  resize(width, height) {
    this.renderer.setSize(width, height);
  }

  onDocMouseDown(event) {
    event.preventDefault();
    this.mouse = new THREE.Vector2();
    this.movements = [];
    this.objects = [];
    this.objects.push(this.scene.children[5].children[1]);

    this.mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =
      (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    const intersects = this.raycaster.intersectObjects(this.objects);
    console.log(intersects);

    if (intersects.length > 0) {
      this.movements.push(intersects[0]);
      console.log(this.movements);
    }
  }
}
