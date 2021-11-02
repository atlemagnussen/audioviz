export default class BlendPattern {
    static resizeMatrixValues(oldMat: any, oldWidth: any, oldHeight: any, newWidth: any, newHeight: any): Float32Array;
    constructor(opts: any);
    mesh_width: any;
    mesh_height: any;
    aspectx: any;
    aspecty: any;
    vertInfoA: Float32Array;
    vertInfoC: Float32Array;
    updateGlobals(opts: any): void;
    genPlasma(x0: any, x1: any, y0: any, y1: any, dt: any): void;
    createBlendPattern(): void;
}
