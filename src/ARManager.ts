import { TextureLoader } from "three";

export class ARManager {
    private static instance: ARManager = null;
    private textureLaoder: TextureLoader;

    public static get Instance(): ARManager  {
        if (this.instance == null) {
            ARManager.instance = new ARManager();
            ARManager.Instance.textureLaoder = new TextureLoader();
        }
        return ARManager.instance;
    }

    public flush() {
        ARManager.Instance.textureLaoder = null;
    }

    public get TextureLoader() {
        return ARManager.instance.textureLaoder;
    }
}