import { Vector2 } from "three"
import { Quadrant } from "./interfaces"

export const getCurrentQuadrant = (pos: Vector2) => {
    pos.x /= window.innerWidth;
    pos.y /= window.innerHeight;

    if (pos.x >= 0 && pos.x <= 0.5 && pos.y >= 0 && pos.y <= 0.5) {
        return Quadrant.TopLeft;
    }
    else if (pos.x >= 0.5 && pos.x <= 1 && pos.y >= 0 && pos.y <= 0.5) {
        return Quadrant.TopRight;
    }
    else if (pos.x >= 0 && pos.x <= 0.5 && pos.y >= 0.5 && pos.y <= 1) {
        return Quadrant.BottomLeft;
    }
    else if (pos.x >= 0.5 && pos.x <= 1 && pos.y >= 0.5 && pos.y <= 1) {
        return Quadrant.BottomRight;    
    } 
    else {
        return Quadrant.None;
    }
}

export const createButton = (name: string) => {
    let button = document.createElement('input');
    button.type = 'checkbox';
    button.value = name;
    button.name = name;
    return button;
}

export const createTranslationControls = () => {
    const tButton = createButton("Translate");
    const rButton = createButton("Rotate");
    const sButton = createButton("Scale");

    const container = document.createElement("div");
    container.style.position = 'absolute';

    const bContainer = document.createElement("div");
    container.appendChild(bContainer);
    bContainer.appendChild(tButton);
    bContainer.appendChild(rButton);
    bContainer.appendChild(sButton);

    bContainer.style.display = 'flex';
    bContainer.style.flexDirection = 'column';

    return { tButton, rButton, sButton, container };
}