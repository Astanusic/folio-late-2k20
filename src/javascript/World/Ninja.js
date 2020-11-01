import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EE from "../Utils/EventEmitter";

export default class Ninja {
  constructor(_options) {
    this.physics = _options.physics;
    this.renderer = _options.renderer;
    this.camera = _options.camera;
    this.time = _options.time;
    this.assetsPath = "/models";
    this.container = new THREE.Object3D();

    this.setPlayer();

    EE.on("global:tick", (delta) => {
      if (this.mixer) this.mixer.update(delta * 0.001);

      // if (this.character.position != undefined) console.log(this.physics);

      if (this.container.position) {
        this.container.position.copy(this.physics.ninja.body.position);
        this.container.quaternion.copy(this.physics.ninja.body.quaternion);
      }
    });
  }

  setPlayer() {
    const loader = new GLTFLoader();
    const player = this;

    loader.load(`${this.assetsPath}/gltf/Ninja-test.glb`, (gltf) => {
      player.character = gltf.scene;
      this.container.add(player.character);

      player.character.traverse((object) => {
        if (object.isMesh) {
          console.log("object =>", object);
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      player.mixer = new THREE.AnimationMixer(player.character);
      player.animations = gltf.animations;

      player.clip = THREE.AnimationClip.findByName(
        player.animations,
        "NinjaIdle"
      );
      player.action = player.mixer.clipAction(player.clip);
      player.action.play();
    });
  }
}
