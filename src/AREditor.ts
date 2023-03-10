import { AmbientLight,Clock, Color, MathUtils, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { ARScreen } from "./ARScreen";
import { ARView } from "./ARView";
import { CameraType, Quadrant } from "./interfaces";
import { getCurrentQuadrant } from "./Utils";
import { WoodenBox } from "./WoodenBox";

let scene: Scene;
let webGlRenderer: WebGLRenderer;
let ambientLight: AmbientLight;
let clock: Clock;
let box: WoodenBox;
let canvas: HTMLCanvasElement;

let views: Array<ARView>;
let mouseDownCheck: boolean = false;
let mosueDelta = {
    posX: 0,
    posY: 0,
    x: 0,
    y: 0
}
let currentQuadrant: Quadrant = Quadrant.None;


export const initVars = () => {
    ARScreen.Instance.init();
    canvas = document.createElement('canvas');
    canvas.width = ARScreen.Instance.WIDTH;
    canvas.height = ARScreen.Instance.HEIGHT;
    document.body.appendChild(canvas);

    scene = new Scene();
    webGlRenderer = new WebGLRenderer({ canvas });
    ambientLight = new AmbientLight();
    clock = new Clock(true);
    box = new WoodenBox();

    views = new Array<ARView>();
    views.push(new ARView(CameraType.Perspective, Quadrant.TopLeft, new Color('red')));
    views.push(new ARView(CameraType.Orthographic, Quadrant.TopRight, new Color('blue')));
    views.push(new ARView(CameraType.Orthographic, Quadrant.BottomLeft, new Color('green')));
    views.push(new ARView(CameraType.Orthographic, Quadrant.BottomRight, new Color('cyan')));

    views[0].Camera.position.set(0 , 5   , 5);
    views[1].Camera.position.set(0 , 0 , 5);
    views[2].Camera.position.set(5 , 0 , 0);
    views[3].Camera.position.set(0 , 5 , 0);

    ARScreen.Instance.subscribeToResize((width: number, height: number) => {
        webGlRenderer.setSize(width, height);
    })
    window.addEventListener('mousedown', onMouseDownEvent);
}

const onMouseDownEvent = (event: MouseEvent) => {
    mouseDownCheck = true;
    mosueDelta.posX = event.pageX;
    mosueDelta.posY = event.pageY;
    window.addEventListener('mousemove', onMouseMoveEvent);
    window.addEventListener('mouseup', onMouseUpEvent);
}
const onMouseMoveEvent = (event: MouseEvent) => {
    mosueDelta.x = MathUtils.degToRad(event.pageX - mosueDelta.posX);
    mosueDelta.y = MathUtils.degToRad(event.pageY - mosueDelta.posY);
    currentQuadrant = getCurrentQuadrant(new Vector2(event.pageX, event.pageY));
}
const onMouseUpEvent = (event: MouseEvent) => {
    mouseDownCheck = false;
    mosueDelta.posX = 0;
    mosueDelta.posY = 0;
    currentQuadrant = Quadrant.None;
    window.removeEventListener('mouseup', onMouseUpEvent);
    window.removeEventListener('mousemove', onMouseMoveEvent);
}

export const initScene = () => {
    scene.add(box);
    scene.add(ambientLight);
}

export const updateScene = () => {
    if (mouseDownCheck && currentQuadrant !== Quadrant.None && currentQuadrant !== Quadrant.TopLeft) {
        if (currentQuadrant == Quadrant.TopRight) {
            if (views[1].UILayer.RotationChecked) {
                mosueDelta.x /= 15;
                const axis = new Vector3(0, 0, 1);
                box.rotateOnWorldAxis(axis, (mosueDelta.x));
            }
            if (views[1].UILayer.TranslationChecked) {
                box.position.set(mosueDelta.x, -mosueDelta.y, box.position.z);
            }
            if (views[1].UILayer.ScalingChecked) {
                const sModifier = new Vector2(mosueDelta.x / 20, mosueDelta.y / 20);
                box.scale.set(box.scale.x + sModifier.x , box.scale.y + sModifier.y, box.scale.z);
            }
        } else if (currentQuadrant == Quadrant.BottomLeft) {
            if (views[2].UILayer.RotationChecked) {
                mosueDelta.x /= 15;
                const axis = new Vector3(1, 0, 0);
                box.rotateOnWorldAxis(axis, mosueDelta.x);
            }
            if (views[2].UILayer.TranslationChecked) {
                box.position.set(box.position.x, -mosueDelta.y, -mosueDelta.x);
            }
            if (views[2].UILayer.ScalingChecked) {
                const sModifier = new Vector2(mosueDelta.x / 20, mosueDelta.y / 20);
                box.scale.set(box.scale.z, box.scale.y + sModifier.y , box.scale.z + sModifier.x);
            }
        } else if (currentQuadrant == Quadrant.BottomRight){
            if (views[3].UILayer.RotationChecked) {
                mosueDelta.x /= 15;
                const axis = new Vector3(0, 1, 0);
                box.rotateOnWorldAxis(axis, mosueDelta.x);
            }
            if (views[3].UILayer.TranslationChecked) {
                box.position.set(mosueDelta.x, box.position.y, mosueDelta.y);
            }
            if (views[3].UILayer.ScalingChecked) {
                const sModifier = new Vector2(mosueDelta.x / 20, mosueDelta.y / 20);
                box.scale.set(box.scale.x + sModifier.x , box.scale.y, box.scale.z + sModifier.y);
            }
        }
    }
}

const vIndex = 1;

export const updateEditor = () => {
    for (let view of views) {
        view.update();
        webGlRenderer.setViewport(view.RViewPort.left, view.RViewPort.bottom, view.RViewPort.width, view.RViewPort.height);
        webGlRenderer.setScissor(view.RViewPort.left, view.RViewPort.bottom, view.RViewPort.width, view.RViewPort.height);
        webGlRenderer.setScissorTest(true);
        webGlRenderer.setClearColor(view.ClearColor);
        webGlRenderer.render(scene, view.Camera);
    }

    clock.getElapsedTime();
    scene.updateMatrixWorld();
    updateScene();
}






