import { BoxGeometry, Mesh, MeshStandardMaterial, Object3D, TextureLoader } from "three";
import { ARManager } from "./ARManager";

export class WoodenBox extends Object3D {
    private material: MeshStandardMaterial;
    private mesh: Mesh;

    constructor() {
        super();
        this.material = new MeshStandardMaterial();
        this.mesh = new Mesh(new BoxGeometry(), this.material);
        this.add(this.mesh);

        (ARManager.Instance.TextureLoader).load('assets/textures/RTS_Crate.png', (texture) => {
            console.log("Laoded Textire")
            this.material.map = texture;
            this.material.needsUpdate = true;
        })
    }

    update() {
        this.update();
    }
}