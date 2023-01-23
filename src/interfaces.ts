export enum CameraType {
    Perspective,
    Orthographic
}

export enum Quadrant {
    None,
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight
}

export interface ViewPort {
    left: number;
    bottom: number;
    width: number;
    height: number;
}