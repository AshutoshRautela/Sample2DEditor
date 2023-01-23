import { initVars, initScene, updateEditor } from './src/AREditor';

window.onload = () => {
    initVars();
    initScene();

    requestAnimationFrame(renderFrame);
}

const renderFrame = () => {
    updateEditor();
    requestAnimationFrame(renderFrame);
}