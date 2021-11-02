export default class OutputShader {
    constructor(gl: any, opts: any);
    gl: any;
    textureRatio: any;
    texsizeX: any;
    texsizeY: any;
    positions: Float32Array;
    vertexBuf: any;
    floatPrecision: string;
    useFXAA(): boolean;
    updateGlobals(opts: any): void;
    createFXAAShader(): void;
    shaderProgram: any;
    positionLocation: any;
    textureLoc: any;
    texsizeLoc: any;
    createShader(): void;
    renderQuadTexture(texture: any): void;
}
