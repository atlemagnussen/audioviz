export default class BlurVertical {
    constructor(gl: any, blurLevel: any);
    gl: any;
    blurLevel: any;
    wds: Float32Array;
    wDiv: number;
    positions: Float32Array;
    vertexBuf: any;
    floatPrecision: string;
    createShader(): void;
    shaderProgram: any;
    positionLocation: any;
    textureLoc: any;
    texsizeLocation: any;
    ed1Loc: any;
    ed2Loc: any;
    ed3Loc: any;
    wdsLocation: any;
    wdivLoc: any;
    renderQuadTexture(texture: any, mdVSFrame: any, srcTexsize: any): void;
}
