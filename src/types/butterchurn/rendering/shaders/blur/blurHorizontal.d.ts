export default class BlurHorizontal {
    constructor(gl: any, blurLevel: any);
    gl: any;
    blurLevel: any;
    ws: Float32Array;
    ds: Float32Array;
    wDiv: number;
    positions: Float32Array;
    vertexBuf: any;
    floatPrecision: string;
    createShader(): void;
    shaderProgram: any;
    positionLocation: any;
    textureLoc: any;
    texsizeLocation: any;
    scaleLoc: any;
    biasLoc: any;
    wsLoc: any;
    dsLocation: any;
    wdivLoc: any;
    getScaleAndBias(blurMins: any, blurMaxs: any): {
        scale: number;
        bias: number;
    };
    renderQuadTexture(texture: any, mdVSFrame: any, blurMins: any, blurMaxs: any, srcTexsize: any): void;
}
