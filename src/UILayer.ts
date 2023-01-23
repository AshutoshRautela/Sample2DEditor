import { Quadrant } from "./interfaces";
import { createButton, createTranslationControls } from "./Utils";

export class UILayer {
    private translationButton: HTMLInputElement;
    private rotationButton: HTMLInputElement;
    private scalingButton: HTMLInputElement;

    private translationChecked: boolean;
    private rotationChecked: boolean;
    private scalingChecked: boolean;

    private tControls: HTMLDivElement;

    constructor(private quadrant: Quadrant) {
        const controls = createTranslationControls();
        this.tControls = controls.container;
        this.translationButton = controls.tButton;
        this.rotationButton = controls.rButton;
        this.scalingButton = controls.sButton;

        this.rotationButton.addEventListener('change', event => {
            this.rotationChecked = this.rotationButton.checked;
        });
        this.translationButton.addEventListener('change', event => {
            this.translationChecked = this.translationButton.checked;
        });
        this.scalingButton.addEventListener('change', event => {
            this.scalingChecked = this.scalingButton.checked;
        });
        document.body.appendChild(this.tControls);

        this.tControls.style.position = 'absolute';
        if (quadrant === Quadrant.TopLeft) {
            this.tControls.style.left = '2%';
            this.tControls.style.top = '2%';
        }
        else if (quadrant === Quadrant.TopRight) {
            this.tControls.style.left = '52%';
            this.tControls.style.top = '2%';
        }
        else if (quadrant === Quadrant.BottomLeft) {
            this.tControls.style.left = '2%';
            this.tControls.style.top = '52%';
        }
        else if (quadrant === Quadrant.BottomRight) {
            this.tControls.style.left = '52%';
            this.tControls.style.top = '52%';
        }
    }

    public get TranslationChecked() {
        return this.translationChecked;
    }

    public get RotationChecked() {
        return this.rotationChecked;
    }

    public get ScalingChecked() {
        return this.scalingChecked;
    }
}