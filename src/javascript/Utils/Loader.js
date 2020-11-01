import * as THREE from "three";
import EE from "./EventEmitter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import CANNON from "cannon";

export default class Loaders {
  constructor(_options) {
    this.scene = _options.scene;
    this.world = _options.world;
    this.name = _options.name;
    this.anims = _options.anims;
    this.assetsPath = "/models";
    this.clock = new THREE.Clock();
    this.player = {};

    this.initWorld();
    this.setLoaders();
    this.animate();
  }

  setLoaders() {
    this.GltfLoader = new GLTFLoader();
    const game = this;

    this.GltfLoader.load(`${this.assetsPath}/gltf/Ninja-test.glb`, (gltf) => {
      game.player = gltf.scene;
      this.scene.add(game.player);

      game.player.traverse((object) => {
        if (object.isMesh) {
          console.log("object =>", object);
          object.castShadow = true;
        }
      });

      game.mixer = new THREE.AnimationMixer(game.player);
      game.animations = gltf.animations;

      game.clip = THREE.AnimationClip.findByName(game.animations, "NinjaIdle");
      game.action = game.mixer.clipAction(game.clip);
      game.action.play();
      console.log("MIXER =>", game.mixer);
      console.log("PLAYER MODEL OBJ =>", game.player);
    });
  }

  initWorld() {
    // this.world = new CANNON.World();
    // this.world.gravity.set(0, 0, 0);
    // this.world.broadphase = new CANNON.NaiveBroadphase();
    // this.world.solver.iterations = 10;

    this.shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    this.body = new CANNON.Body({
      mass: 5,
    });
    this.body.addShape(this.shape);
    this.world.addBody(this.body);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    if (this.mixer) this.mixer.update(delta);

    this.world.step(1 / 60);

    if (this.player.position) {
      // console.log(this.player.position);
      // console.log(this.body.position);
      this.player.position.copy(this.body.position);
      this.player.quaternion.copy(this.body.quaternion);
    }
  }
}
