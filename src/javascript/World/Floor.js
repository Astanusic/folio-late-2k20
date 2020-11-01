import * as THREE from "three";

export default class Floor {
  constructor(_options) {
    this.container = new THREE.Object3D();
    this.physics = _options.physics;

    this.geometry = new THREE.PlaneBufferGeometry(2000, 2000, 10, 10);

    this.material = new THREE.MeshPhongMaterial({ color: "#f5aa58" });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -85;
    this.mesh.receiveShadow = true;
    this.container.add(this.mesh);
  }
}
