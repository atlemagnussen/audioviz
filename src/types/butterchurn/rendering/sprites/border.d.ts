export default class Border {
    constructor(gl: any, opts?: {});
    gl: any;
    positions: Float32Array;
    aspectx: any;
    aspecty: any;
    invAspectx: number;
    invAspecty: number;
    floatPrecision: string;
    vertexBuf: any;
    updateGlobals(opts: any): void;
    createShader(): void;
    shaderProgram: any;
    aPosLoc: any;
    colorLoc: any;
    addTriangle(offset: any, point1: any, point2: any, point3: any): void;
    generateBorder(borderColor: any, borderSize: any, prevBorderSize: any): boolean;
    drawBorder(borderColor: any, borderSize: any, prevBorderSize: any): void;
}
