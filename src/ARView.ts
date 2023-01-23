import { Camera, Color, OrthographicCamera, PerspectiveCamera, Vector3 } from "three";
import { ARScreen } from "./ARScreen";
import { CameraType, Quadrant, ViewPort } from "./interfaces";
import { UILayer } from "./UILayer";

export class ARView {

    private viewport: ViewPort = {left: 0 , bottom: 0 , width: 0 , height: 0};
    private camera: Camera;
    private uiLayer: UILayer;

    private orthFrustumSize: number = 5;

    constructor(private cameraType: CameraType, private quadrant: Quadrant, public clearColor: Color) {
        this.initQuadantDimensions();
        this.initCamera();
        if (this.quadrant !== Quadrant.None && this.quadrant !== Quadrant.TopLeft)
            this.uiLayer = new UILayer(quadrant);
    }

    private initQuadantDimensions() {
        switch (this.quadrant) {
            case Quadrant.BottomLeft:
                this.viewport.left = 0;
                this.viewport.bottom = 0;
                this.viewport.width = 0.5;
                this.viewport.height = 0.5;
                break;
            case Quadrant.BottomRight:
                this.viewport.left = 0.5;
                this.viewport.bottom = 0;
                this.viewport.width = 0.5;
                this.viewport.height = 0.5;
            break;
            case Quadrant.TopRight:
                this.viewport.left = 0.5;
                this.viewport.bottom = 0.5;
                this.viewport.width = 0.5;
                this.viewport.height = 0.5;
            break;
            case Quadrant.TopLeft:
                this.viewport.left = 0;
                this.viewport.bottom = 0.5;
                this.viewport.width = 0.5;
                this.viewport.height = 0.5;
            break;
        }
    }

    private updateCameraFrustrum(camera: OrthographicCamera) {
        (this.camera as OrthographicCamera).left = this.orthFrustumSize / -2;
        (this.camera as OrthographicCamera).right = this.orthFrustumSize / 2;
        (this.camera as OrthographicCamera).top = this.orthFrustumSize  / (ARScreen.Instance.ASPECT_RATIO * 2);
        (this.camera as OrthographicCamera).bottom = this.orthFrustumSize / (ARScreen.Instance.ASPECT_RATIO * -2);
        (this.camera as OrthographicCamera).updateProjectionMatrix();
    }

    private initCamera() {
        this.camera = this.cameraType === CameraType.Perspective ? new PerspectiveCamera(75, ARScreen.Instance.ASPECT_RATIO) : new OrthographicCamera();
        this.cameraType === CameraType.Orthographic && this.updateCameraFrustrum(this.camera as OrthographicCamera);
        ARScreen.Instance.subscribeToResize((width, height, aspect) => {
            if (this.cameraType === CameraType.Perspective) {
                (this.camera as PerspectiveCamera).aspect = aspect;
                (this.camera as PerspectiveCamera).updateProjectionMatrix();
            } else {
                this.updateCameraFrustrum(this.camera as OrthographicCamera);
            }
        });
    }

    public update() {
        this.camera.lookAt(new Vector3(0, 0 , 0));
        this.camera.updateMatrix();
    }

    public get Camera() {
        return this.camera;
    }

    public get ViewPort() {
        return this.viewport;
    }

    public get RViewPort() {
        const rViewPort = {...this.viewport};
        rViewPort.left *= ARScreen.Instance.WIDTH;
        rViewPort.bottom *= ARScreen.Instance.HEIGHT;
        rViewPort.width *= ARScreen.Instance.WIDTH;
        rViewPort.height *= ARScreen.Instance.HEIGHT;
        return rViewPort;
    }

    public set ClearColor(color: Color) {
        this.clearColor = color;
    }

    public get ClearColor() {
        return this.clearColor;
    }

    public get UILayer() {
        return this.uiLayer;
    }
}