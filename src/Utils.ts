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