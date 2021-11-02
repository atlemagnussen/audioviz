export default class CustomShape {
    constructor(gl: any, opts: any);
    gl: any;
    aspectx: any;
    aspecty: any;
    invAspectx: number;
    invAspecty: number;
    colors: Float32Array;
    positionVertexBuf: any;
    colorVertexBuf: any;
    floatPrecision: string;
    updateGlobals(opts: any): void;
    generatePositions(): void;
    positions: Float32Array;
    createShader(): void;
    shaderProgram: any;
    aPosLocation: any;
    aColorLocation: any;
    drawDarkenCenter(mdVSFrame: any): void;
}
