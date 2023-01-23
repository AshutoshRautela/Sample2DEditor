import { Quadrant } from "./interfaces";

export class UILayer {
    private button: HTMLInputElement;
    private checked: boolean;

    constructor(private quadrant: Quadrant) {
        this.button = document.createElement('input');
        this.button.type = 'checkbox'
        this.button.value = 'Rotate'
        this.button.name = 'Rotate'
        document.body.appendChild(this.button);

        this.button.addEventListener('change', event => {
            this.checked = this.button.checked;
        });


        this.button.style.position = 'absolute';
        if (quadrant === Quadrant.TopLeft) {
            this.button.style.left = '2%';
            this.button.style.top = '2%';
        }
        else if (quadrant === Quadrant.TopRight) {
            this.button.style.left = '52%';
            this.button.style.top = '2%';
        }
        else if (quadrant === Quadrant.BottomLeft) {
            this.button.style.left = '2%';
            this.button.style.top = '52%';
        }
        else if (quadrant === Quadrant.BottomRight) {
            this.button.style.left = '52%';
            this.button.style.top = '52%';
        }
    }

    public get Checked() {
        return this.checked;
    }
}