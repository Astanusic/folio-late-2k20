import * as CANNON from "cannon-es";
import EE from "../Utils/EventEmitter";

export default class Physics {
  constructor(_options) {
    this.time = _options.time;
    this.sizes = _options.sizes;
    this.world = new CANNON.World();

    this.initWorld();
    this.setGround();
    this.setNinja();

    EE.on("global:tick", () => {
      this.world.step(1 / 60, this.time.delta, 3);
    });
  }

  initWorld() {
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.gravity.set(0, -5, 0);
    this.world.defaultContactMaterial.friction = 0;
    this.world.defaultContactMaterial.restitution = 0.2;
  }

  setGround() {
    this.floor = {};
    this.floor.shape = new CANNON.Plane();
    this.floor.body = new CANNON.Body({
      mass: 0,
    });
    this.floor.body.addShape(this.floor.shape);
    this.floor.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );

    this.world.addBody(this.floor.body);
  }

  setNinja() {
    this.ninja = {};

    this.ninja.shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    this.ninja.body = new CANNON.Body({
      mass: 1,
    });
    // this.ninja.body.type = CANNON.Body.KINEMATIC;
    this.ninja.body.addShape(this.ninja.shape);
    this.ninja.body.position.y = 200;
    this.world.addBody(this.ninja.body);
  }
}
